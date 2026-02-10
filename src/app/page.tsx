"use client";

import { useEffect, useMemo, useState } from "react";
import ContactForm from "@/components/ContactForm";

type Lang = "th" | "en";

type ServiceItem = { title: string; desc: string };

type DetailCard = {
  title: string;
  subtitle: string;
  accent: string;
  items?: string[];
};

type Content = {
  navSwitch: string;
  featureTag: string;
  heroTitle: string;
  heroBody1: string;
  heroBody2: string;
  cta: string;
  serviceTitle: string;
  servicesLeft: ServiceItem[];
  servicesRight: ServiceItem[];
  detailTitle: string;
  contactTitle: string;
  contactLead: string;
  contactLabel: string;
  emailLabel: string;
  phoneLabel: string;
  officeHours: string;
  featureLead: string;
  featureBody: string;
  detailBadge: string;
  footerEmailLabel: string;
  footerPhoneLabel: string;
  formLabels: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
  };
  detailCards: DetailCard[];
};

const CONTENT: Record<Lang, Content> = {
  th: {
    navSwitch: "English",
    featureTag: "บริการหลัก",
    heroTitle: "ผู้เชี่ยวชาญด้าน BOI\nการส่งเสริมการลงทุนในประเทศไทย",
    heroBody1:
      "เราให้บริการที่ปรึกษาและดำเนินการแบบครบวงจร สำหรับนักลงทุนและธุรกิจทั้งในและต่างประเทศ ตั้งแต่การยื่นขอรับการส่งเสริมการลงทุน การนำเข้าเครื่องจักรและวัตถุดิบ การขอวีซ่าและใบอนุญาตทำงาน ไปจนถึงการดูแลการปฏิบัติตามเงื่อนไขหลังได้รับการส่งเสริม",
    heroBody2:
      "เราช่วยให้การลงทุนของคุณในประเทศไทยเป็นไปอย่างราบรื่น ถูกต้องตามกฎหมาย และสร้างผลลัพธ์ที่ยั่งยืน เพื่อให้คุณโฟกัสกับการเติบโตของธุรกิจได้อย่างเต็มที่",
    cta: "ติดต่อเรา",
    serviceTitle: "บริการแนะนำ",
    servicesLeft: [
      {
        title: "การขอรับการส่งเสริมจาก BOI",
        desc: "ปรึกษา ยื่นคำขอ ตอบรับมติ",
      },
      {
        title: "ระบบงานเครื่องจักร",
        desc: "ขอบัญชีรายการเครื่องจักร ขอส่งปล่อยเครื่องจักร ขอคืนอากรขาเข้า",
      },
      {
        title: "Single Window",
        desc: "ขออนุญาตนำคนเข้า และขอความร่วมมือประกันการเข้าทำงาน",
      },
    ],
    servicesRight: [
      {
        title: "การปฏิบัติหลังได้รับการส่งเสริม",
        desc: "การใช้สิทธิประโยชน์ การรายงานผลดำเนินการ การรายงานความคืบหน้าโครงการ การแก้ไขโครงการ การดำเนินการ",
      },
      {
        title: "ระบบงานวัตถุดิบ",
        desc: "ขอบัญชีรายการวัตถุดิบ ขอส่งปล่อยวัตถุดิบ ขอคืนอากรวัตถุดิบ",
      },
    ],
    detailTitle: "รายละเอียด",
    contactTitle: "ติดต่อเรา",
    contactLead: "ฝากข้อมูลเพื่อรับคำปรึกษา ทีมงานจะติดต่อกลับภายใน 1 วันทำการ",
    contactLabel: "ติดต่อ",
    emailLabel: "อีเมล",
    phoneLabel: "เบอร์",
    officeHours: "เวลาทำการ: จันทร์-ศุกร์ 09:00 - 18:00",
    featureLead: "นำทีมโดยผู้เชี่ยวชาญที่เข้าใจระบบ BOI อย่างลึกซึ้ง",
    featureBody:
      "ช่วยจัดการเอกสารและกระบวนการอย่างเป็นระบบ พร้อมวางแผนการใช้สิทธิประโยชน์ให้เหมาะกับธุรกิจของคุณ",
    detailBadge: "ระบบจัดการและบริการแบบครบวงจร",
    footerEmailLabel: "อีเมล",
    footerPhoneLabel: "โทร",
    formLabels: {
      firstName: "ชื่อจริง",
      lastName: "นามสกุล",
      email: "อีเมล",
      message: "ข้อความของคุณ",
      firstNamePlaceholder: "ชื่อ",
      lastNamePlaceholder: "นามสกุล",
      emailPlaceholder: "email@kms.com",
      messagePlaceholder: "เขียนคำถามหรือข้อความของคุณ",
      submit: "ส่ง",
      submitting: "กำลังส่ง...",
      success: "ส่งข้อความเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็ว",
      error: "ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง",
    },
    detailCards: [
      {
        title: "eMT Online",
        subtitle: "ระบบงานเครื่องจักร",
        accent: "from-[#111827] to-[#1f2937]",
        items: [
          "ขออนุมัติบัญชีรายการเครื่องจักร",
          "ขอแก้ไขงานขออนุมัติบัญชีรายการเครื่องจักร",
          "ขออนุมัติสั่งปล่อยเครื่องจักรปกติ / ขอสั่งปล่อยแบบขอคืนอากรและถอนคำประกันเครื่องจักร / ขออนุมัติส่งคืน-ส่งซ่อมเครื่องจักรออกไปต่างประเทศ",
          "ขออนุมัติส่งคืน - ส่งซ่อมเครื่องจักรออกไปต่างประเทศ",
          "ขอขยายเวลานำเข้าเครื่องจักรย้อนหลัง / งานขอขยายเวลานำเข้าเครื่องจักรปกติ",
          "ตัดบัญชีเครื่องจักร/ตัดบัญชีเครื่องจักรนำเข้าเกิน 5 ปี / ตัดบัญชีทำลายเครื่องจักร / ตัดบัญชีบริจาคเครื่องจักร / ตัดบัญชีชำระภาษีเครื่องจักร / ตัดบัญชีส่งคืนเครื่องจักร / ตัดบัญชีจำหน่ายเครื่องจักร",
          "ขอทำลายเครื่องจักร",
          "ขอบริจาคเครื่องจักร",
          "ขอชำระภาษีอากรเครื่องจักร",
          "ขอจำหน่ายเครื่องจักร / ขอจำหน่ายเครื่องจักร ไม่มีภาระภาษี / งานขอจำหน่ายเครื่องจักร มีภาระภาษี",
          "ขอจำนองเครื่องจักร",
          "ขอเช่าซื้อ/ลิสซิ่งเครื่องจักร",
          "ขอใช้เครื่องจักรเพื่อการอื่น",
          "ขอนำเครื่องจักรไปให้บุคคลอื่นใช้",
          "ขอยกเลิก / คำร้องสั่งปล่อย / ค้ำ - ขยายเวลาค้ำประกัน / ส่งคืน-ส่งซ่อม ฯลฯ",
        ],
      },
      {
        title: "RMTS",
        subtitle: "ระบบงานวัตถุดิบ",
        accent: "from-[#f59e0b] to-[#d97706]",
        items: [
          "ขออนุมัติบัญชีรายการวัตถุดิบ",
          "ขอแก้ไขบัญชีรายการวัตถุดิบ",
          "ขอเพิ่มบัญชีรายการวัตถุดิบ",
          "ขอยกเลิกรายการวัตถุดิบ",
          "ขอเพิ่มจำนวนวัตถุดิบ",
          "ขอลดจำนวนวัตถุดิบ",
          "ขอเพิ่มรายการชื่อรอง",
          "ขอลบรายการชื่อรอง",
          "ขออนุมัติสูตรการผลิต",
          "ขอแก้ไขสูตรการผลิต",
          "ขออนุมัติขยายเวลานำเข้าวัตถุดิบ",
          "สั่งปล่อยวัตถุดิบแบบปกติ / ขอคืนอากร / ยกเลิกคำร้อง",
          "ขอตัดบัญชีวัตถุดิบ / โอน Report-V",
          "ขอยกเลิก / แก้ไข Report-V",
          "ขอปรับยอดวัตถุดิบ",
        ],
      },
      {
        title: "Single Window",
        subtitle: "วีซ่า และใบอนุญาตทำงาน",
        accent: "from-[#e5e7eb] to-[#9ca3af]",
        items: [
          "ขออนุญาตนำคนต่างด้าวเข้ามาในราชอาณาจักร",
          "ขออนุมัติตำแหน่งหน้าที่ / ขอยกเลิกตำแหน่งหน้าที่ที่ได้รับอนุมัติของคนต่างด้าว",
          "ขอเปลี่ยนตำแหน่ง",
          "ขอเพิ่มลักษณะงาน / ขอยกเลิกการเพิ่มลักษณะงาน",
          "ขอบรรจุคนต่างด้าวและขออนุญาตให้ครอบครัวเข้ามาในประเทศ",
          "ขออนุญาติให้ครอบครัวของคนต่างด้าวเข้ามาในประเทศ",
          "ขออนุญาติให้คนต่างด้าวและครอบครัวหรือครอบครัวคนต่างด้าว อยู่ในราชอาณาจักรตามสิทธิเดิม",
          "ขอความร่วมมือในการประทับตราวีซ่าของคนต่างด้าวและครอบครัว หรือครอบครัวคนต่างด้าว",
          "ขอรับการตรวจลงตรา / ขอรับรองการเปลี่ยนประเภทการตรวจลงตราของคนต่างด้าวและครอบครัวหรือครอบครัวคนต่างด้าว",
          "ขอขยายเวลาของตำแหน่งคนต่างด้าวหรือขอต่ออายุการอยู่ในประเทศของคนต่างด้าวและครอบครัว หรือครอบครัวคนต่างด้าว",
          "ขอแจ้งพ้นคนต่างด้าวและครอบครัวหรือครอบครัวคนต่างด้าว",
          "ขอเปลี่ยนชื่อ-สกุลคนต่างด้าวและครอบครัวหรือครอบครัวคนต่างด้าว",
          "ขอเปลี่ยนชื่อบริษัท / ขอรวมบัตรส่งเสริม / ขอโอนบัตรส่งเสริม",
        ],
      },
    ],
  },
  en: {
    navSwitch: "ไทย",
    featureTag: "Core Services",
    heroTitle: "BOI Investment Promotion Experts\nin Thailand",
    heroBody1:
      "We provide end-to-end BOI consulting for investors and businesses in Thailand and abroad. Our services cover BOI promotion applications, machinery and raw material imports, visa and work permit processes, and post-promotion compliance.",
    heroBody2:
      "We help your investment move smoothly, legally, and sustainably so you can focus on growing your business.",
    cta: "Contact Us",
    serviceTitle: "Recommended Services",
    servicesLeft: [
      {
        title: "BOI Promotion Applications",
        desc: "Consulting, application submission, and approval support",
      },
      {
        title: "Machinery System",
        desc: "Machinery list approval, customs release, duty refund",
      },
      {
        title: "Single Window",
        desc: "Entry permits and cooperation for work authorization",
      },
    ],
    servicesRight: [
      {
        title: "Post-Promotion Compliance",
        desc: "Benefits utilization, performance reports, project progress, amendments, ongoing compliance",
      },
      {
        title: "Raw Materials System",
        desc: "Raw material lists, customs release, duty refunds",
      },
    ],
    detailTitle: "Details",
    contactTitle: "Contact Us",
    contactLead: "Leave your details and we will get back to you within 1 business day.",
    contactLabel: "Contact",
    emailLabel: "Email",
    phoneLabel: "Phone",
    officeHours: "Business hours: Mon-Fri 09:00 - 18:00",
    featureLead: "Led by experts with deep BOI system knowledge",
    featureBody:
      "We organize documentation and processes efficiently and help plan incentives to match your business.",
    detailBadge: "End-to-end management and services",
    footerEmailLabel: "Email",
    footerPhoneLabel: "Phone",
    formLabels: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      message: "Message",
      firstNamePlaceholder: "First name",
      lastNamePlaceholder: "Last name",
      emailPlaceholder: "email@kms.com",
      messagePlaceholder: "Write your message here",
      submit: "Send",
      submitting: "Sending...",
      success: "Message sent. We will contact you shortly.",
      error: "Unable to send. Please try again.",
    },
    detailCards: [
      {
        title: "eMT Online",
        subtitle: "Machinery System",
        accent: "from-[#111827] to-[#1f2937]",
        items: [
          "Machinery list approval",
          "Machinery list amendment",
          "Normal release / duty refund & bond withdrawal / return-repair abroad approval",
          "Return-repair abroad approval",
          "Import extension (retroactive / normal)",
          "Machinery account adjustments (over 5 years / destruction / donation / duty payment / return / disposal)",
          "Machinery destruction",
          "Machinery donation",
          "Machinery duty payment",
          "Machinery disposal (with/without tax liability)",
          "Machinery mortgage",
          "Hire-purchase / leasing",
          "Machinery use for other purposes",
          "Machinery lending to third parties",
          "Cancellation / release orders / bond extensions / return-repair, etc.",
        ],
      },
      {
        title: "RMTS",
        subtitle: "Raw Materials System",
        accent: "from-[#f59e0b] to-[#d97706]",
        items: [
          "Raw material list approval",
          "Raw material list amendment",
          "Add raw material list",
          "Cancel raw material list",
          "Increase raw material quantity",
          "Reduce raw material quantity",
          "Add alternate names",
          "Remove alternate names",
          "Production formula approval",
          "Production formula amendment",
          "Raw material import extension approval",
          "Normal release / duty refund / cancel request",
          "Raw material account close / Report-V transfer",
          "Cancel / amend Report-V",
          "Raw material balance adjustment",
        ],
      },
      {
        title: "Single Window",
        subtitle: "Visa & Work Permit",
        accent: "from-[#e5e7eb] to-[#9ca3af]",
        items: [
          "Permission to bring foreigners into Thailand",
          "Position approval / cancellation of approved position",
          "Change position",
          "Add job scope / cancel job scope addition",
          "Hire foreigners and request family entry",
          "Permission for foreigner’s family to enter",
          "Extend stay for foreigners and families under existing rights",
          "Cooperation for visa stamping for foreigners and families",
          "Visa issuance / change of visa category certification",
          "Position extension or stay renewal for foreigners and families",
          "Notice of termination for foreigners and families",
          "Change of name-surname for foreigners and families",
          "Company name change / promotion certificate consolidation / transfer",
        ],
      },
    ],
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("th");
  const content = useMemo(() => CONTENT[lang], [lang]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-white text-neutral-950">
      <header className="border-b border-black/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="text-sm font-semibold tracking-[0.25em] text-neutral-700">
            KMS BOI CONSULTING
          </div>
          <div className="flex items-center gap-4 text-sm">
            <button
              type="button"
              onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="text-neutral-500 transition hover:text-neutral-900"
            >
              {content.navSwitch}
            </button>
            <a
              href="#contact"
              className="rounded-md bg-black px-4 py-2 text-white shadow-sm transition hover:bg-neutral-800"
            >
              {content.cta}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 pb-12 pt-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-neutral-400">
                KMS BOI CONSULTING
              </p>
              <h1 className="mt-6 whitespace-pre-line font-[family-name:var(--font-kanit)] text-4xl font-semibold leading-tight text-neutral-950 md:text-5xl">
                {content.heroTitle}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600">
                {content.heroBody1}
              </p>
              <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600">
                {content.heroBody2}
              </p>
              <div className="mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-white shadow-sm transition hover:bg-neutral-800"
                >
                  {content.cta}
                </a>
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-neutral-100 to-white p-8 shadow-sm">
              <div className="space-y-5 rounded-2xl border border-black/5 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">
                  {content.featureTag}
                </p>
                <h2 className="font-[family-name:var(--font-kanit)] text-2xl font-semibold">
                  {content.featureLead}
                </h2>
                <p className="text-sm leading-6 text-neutral-600">
                  {content.featureBody}
                </p>
                <div className="rounded-xl bg-neutral-100 px-4 py-3 text-sm text-neutral-700">
                  {content.officeHours}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-14">
          <div className="rounded-3xl bg-[var(--panel)] px-8 py-10 md:px-10">
            <div className="flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-kanit)] text-2xl font-semibold">
                {content.serviceTitle}
              </h2>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                {content.servicesLeft.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-base font-semibold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-700">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {content.servicesRight.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-base font-semibold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-700">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="font-[family-name:var(--font-kanit)] text-2xl font-semibold">
            {content.detailTitle}
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {content.detailCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-black/5 bg-white shadow-sm"
              >
                <div
                  className={`rounded-t-2xl bg-gradient-to-br ${card.accent} p-4 text-white`}
                >
                  <div className="h-full rounded-xl border border-white/20 bg-white/10 p-4 text-sm">
                    <div className="text-lg font-semibold">{card.title}</div>
                    <p className="mt-2 text-xs leading-5 opacity-90">
                      {content.detailBadge}
                    </p>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <div className="text-base font-semibold">{card.title}</div>
                  <div className="text-sm text-neutral-500">{card.subtitle}</div>
                  {card.items ? (
                    <ul className="mt-3 space-y-2 text-xs leading-5 text-neutral-600">
                      {card.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-neutral-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h2 className="font-[family-name:var(--font-kanit)] text-2xl font-semibold">
                {content.contactTitle}
              </h2>
              <p className="mt-4 text-sm leading-6 text-neutral-600">
                {content.contactLead}
              </p>
              <ContactForm labels={content.formLabels} />
            </div>
            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
              <div className="text-sm uppercase tracking-[0.3em] text-neutral-400">
                {content.contactLabel}
              </div>
              <div className="mt-6 space-y-4 text-sm text-neutral-700">
                <div>
                  <div className="text-xs text-neutral-500">{content.emailLabel}</div>
                  <div>kanokorn.mks@gmail.com</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500">{content.phoneLabel}</div>
                  <div>082-462-9791</div>
                </div>
                {/* <div>
                  <div className="text-xs text-neutral-500">Wechat</div>
                  <div>+66-82-462-9791</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500">Whatsapp</div>
                  <div>+66-82-462-9791</div>
                </div> */}
              </div>
              <div className="mt-8 rounded-2xl bg-neutral-100 p-4 text-xs leading-5 text-neutral-600">
                KMS BOI CONSULTING ให้บริการครบวงจรเกี่ยวกับการส่งเสริมการลงทุน
                พร้อมดูแลเอกสารและการรายงานทุกขั้นตอน
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <div className="font-semibold text-neutral-700">KMS BOI CONSULTING</div>
          <div className="flex flex-wrap gap-4">
            <span>{content.footerEmailLabel}: kanokorn.mks@gmail.com</span>
            <span>{content.footerPhoneLabel}: 082-462-9791</span>
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-sm text-neutral-700 shadow-lg transition-all duration-300 hover:border-black/30 hover:text-neutral-900 ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}
