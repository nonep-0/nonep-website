"use client";

import { useRef, useState } from "react";

type AdminImageFileInputProps = {
  label: string;
  name?: string;
  targetWidth?: number;
  targetHeight?: number;
  mode?: "cover" | "contain";
};

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 1200;

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("이미지를 읽지 못했습니다."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("이미지를 불러오지 못했습니다."));
    image.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality = 0.92) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(new Error("이미지 변환에 실패했습니다."));
      },
      type,
      quality
    );
  });
}

function getOutputType(file: File) {
  if (file.type === "image/png") return "image/png";
  if (file.type === "image/webp") return "image/webp";
  return "image/jpeg";
}

function getExtension(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

async function resizeImageFile({
  file,
  targetWidth,
  targetHeight,
  mode,
}: {
  file: File;
  targetWidth: number;
  targetHeight: number;
  mode: "cover" | "contain";
}) {
  if (!file.type.startsWith("image/")) {
    return file;
  }

  // GIF는 애니메이션이 깨질 수 있어서 원본 유지
  if (file.type === "image/gif") {
    return file;
  }

  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(dataUrl);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return file;
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  context.clearRect(0, 0, targetWidth, targetHeight);

  if (mode === "contain") {
    const scale = Math.min(targetWidth / image.width, targetHeight / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const drawX = (targetWidth - drawWidth) / 2;
    const drawY = (targetHeight - drawHeight) / 2;

    context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  } else {
    const scale = Math.max(targetWidth / image.width, targetHeight / image.height);
    const sourceWidth = targetWidth / scale;
    const sourceHeight = targetHeight / scale;
    const sourceX = (image.width - sourceWidth) / 2;
    const sourceY = (image.height - sourceHeight) / 2;

    context.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      targetWidth,
      targetHeight
    );
  }

  const outputType = getOutputType(file);
  const blob = await canvasToBlob(canvas, outputType);
  const extension = getExtension(outputType);
  const resizedName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

  return new File([blob], resizedName, {
    type: outputType,
    lastModified: Date.now(),
  });
}

export default function AdminImageFileInput({
  label,
  name,
  targetWidth = DEFAULT_WIDTH,
  targetHeight = DEFAULT_HEIGHT,
  mode = "cover",
}: AdminImageFileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<string>(`${targetWidth}×${targetHeight} 자동 맞춤`);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile || !inputRef.current) {
      setStatus(`${targetWidth}×${targetHeight} 자동 맞춤`);
      return;
    }

    try {
      setStatus("이미지 사이즈 맞추는 중...");

      const resizedFile = await resizeImageFile({
        file: selectedFile,
        targetWidth,
        targetHeight,
        mode,
      });

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(resizedFile);
      inputRef.current.files = dataTransfer.files;

      const sizeMb = resizedFile.size / 1024 / 1024;
      setStatus(`${targetWidth}×${targetHeight} 변환 완료 · ${sizeMb.toFixed(2)}MB`);
    } catch (error) {
      console.error(error);
      setStatus("자동 변환 실패 · 원본으로 업로드됩니다");
    }
  }

  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-white/52">
        {label}
      </span>

      <input
        ref={inputRef}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block h-[48px] w-full cursor-pointer rounded-[14px] border border-white/10 bg-black text-[13px] font-semibold text-white/60 file:mr-4 file:h-full file:border-0 file:bg-[#151018] file:px-5 file:text-[12px] file:font-black file:text-[#ff1493]"
      />

      <span className="mt-2 block text-[11px] font-bold text-white/35">
        {status}
      </span>
    </label>
  );
}
