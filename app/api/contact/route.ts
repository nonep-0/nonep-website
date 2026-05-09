import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type ContactPayload = {
  difficulties?: string[];
  marketingStatus?: string;
  brandIntro?: string;
  mainConcern?: string;
  desiredOutcome?: string;
  budget?: string;
  preferredTiming?: string;
  companyName?: string;
  managerInfo?: string;
  phone?: string;
  email?: string;
  website?: string;
  privacyAgreed?: boolean;
};

function clean(value?: string) {
  return value && value.trim().length > 0 ? value.trim() : "";
}

function display(value?: string) {
  return value && value.trim().length > 0 ? value.trim() : "미작성";
}

function displayList(values?: string[]) {
  return values && values.length > 0 ? values.join(", ") : "미선택";
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;

    const {
      difficulties,
      marketingStatus,
      brandIntro,
      mainConcern,
      desiredOutcome,
      budget,
      preferredTiming,
      companyName,
      managerInfo,
      phone,
      email,
      website,
      privacyAgreed,
    } = body;

    const missingFields: string[] = [];

    if (!clean(companyName)) missingFields.push("브랜드명 / 회사명");
    if (!clean(managerInfo)) missingFields.push("담당자명 / 직책");
    if (!clean(phone)) missingFields.push("연락처");
    if (!clean(email)) missingFields.push("이메일");
    if (!privacyAgreed) missingFields.push("개인정보 수집 및 이용 동의");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          message: `필수 항목이 누락되었습니다: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    /**
     * 1. Supabase에 문의 내용 먼저 저장
     * 관리자 페이지에서 최근 문의를 확인하려면 이 저장 단계가 필요함
     */
    const { error: insertError } = await supabaseAdmin.from("inquiries").insert({
      brand_name: clean(companyName),
      contact_name: clean(managerInfo),
      phone: clean(phone),
      email: clean(email),
      website: clean(website),

      difficulty: difficulties || [],
      marketing_stage: clean(marketingStatus),
      brand_intro: clean(brandIntro),
      main_concern: clean(mainConcern),
      desired_result: clean(desiredOutcome),
      budget_range: clean(budget),
      desired_start_time: clean(preferredTiming),

      raw_message: body,

      status: "new",
      admin_memo: "",
    });

    if (insertError) {
      console.error("SUPABASE_INSERT_ERROR", insertError);

      return NextResponse.json(
        {
          message: `문의 저장에 실패했습니다: ${insertError.message}`,
        },
        { status: 500 }
      );
    }

    /**
     * 2. 기존처럼 메일 발송
     */
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const mailTo = process.env.MAIL_TO || "contact@upneun.co.kr";

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          message:
            "문의는 저장되었지만 메일 서버 설정이 누락되었습니다. .env.local의 SMTP_HOST, SMTP_USER, SMTP_PASS를 확인해주세요.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      requireTLS: smtpPort === 587,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,

        // 후이즈 SMTP에서 발생하는 dh key too small 오류 대응
        ciphers: "DEFAULT@SECLEVEL=0",
        minVersion: "TLSv1",
      },
    });

    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("SMTP_VERIFY_ERROR", verifyError);

      const errorMessage =
        verifyError instanceof Error ? verifyError.message : "SMTP 인증 확인 실패";

      return NextResponse.json(
        {
          message: `문의는 저장되었지만 SMTP 연결 또는 인증에 실패했습니다: ${errorMessage}`,
        },
        { status: 500 }
      );
    }

    const subject = `[없는마케팅 문의] ${display(companyName)} / ${display(managerInfo)}`;

    const plainText = `
[없는마케팅 문의]

1. 브랜드를 알리는 과정에서 가장 어려운 점
${displayList(difficulties)}

2. 현재 콘텐츠 또는 마케팅 진행 정도
${display(marketingStatus)}

3. 생각하고 있는 예산 범위
${display(budget)}

4. 진행 희망 시점
${display(preferredTiming)}

5. 어떤 브랜드/사업인지 소개
${display(brandIntro)}

6. 현재 가장 고민되는 부분
${display(mainConcern)}

7. 없는마케팅을 통해 얻고 싶은 결과
${display(desiredOutcome)}

8. 브랜드명 / 회사명
${display(companyName)}

9. 담당자명 / 직책
${display(managerInfo)}

10. 연락처
${display(phone)}

11. 이메일
${display(email)}

12. 홈페이지 또는 SNS 채널 링크
${display(website)}

개인정보 동의
${privacyAgreed ? "동의함" : "미동의"}
`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
        <h2 style="margin: 0 0 24px;">없는마케팅 문의</h2>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tbody>
            ${[
              ["브랜드명 / 회사명", display(companyName)],
              ["담당자명 / 직책", display(managerInfo)],
              ["연락처", display(phone)],
              ["이메일", display(email)],
              ["홈페이지/SNS", display(website)],
              ["어려운 점", displayList(difficulties)],
              ["마케팅 진행 정도", display(marketingStatus)],
              ["예산 범위", display(budget)],
              ["진행 희망 시점", display(preferredTiming)],
              ["브랜드/사업 소개", display(brandIntro)],
              ["현재 고민", display(mainConcern)],
              ["얻고 싶은 결과", display(desiredOutcome)],
              ["개인정보 동의", privacyAgreed ? "동의함" : "미동의"],
            ]
              .map(
                ([label, value]) => `
                  <tr>
                    <th style="width: 220px; text-align: left; vertical-align: top; padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;">
                      ${label}
                    </th>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; white-space: pre-line;">
                      ${value}
                    </td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"없는마케팅 문의" <${smtpUser}>`,
        to: mailTo,
        replyTo: clean(email),
        subject,
        text: plainText,
        html,
      });
    } catch (sendError) {
      console.error("SMTP_SEND_ERROR", sendError);

      const errorMessage =
        sendError instanceof Error ? sendError.message : "메일 발송 실패";

      return NextResponse.json(
        {
          message: `문의는 저장되었지만 메일 발송에 실패했습니다: ${errorMessage}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "문의 내용이 전달되었습니다. 확인 후 순차적으로 연락드리겠습니다.",
    });
  } catch (error) {
    console.error("CONTACT_API_ERROR", error);

    const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류";

    return NextResponse.json(
      {
        message: `문의 전송 중 오류가 발생했습니다: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}