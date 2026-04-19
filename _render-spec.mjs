import { jsPDF } from "jspdf";
import fs from "node:fs";

// ── Inline tokens (mirror src/lib/spec-sheet/tokens.ts) ──────────
const SAFETY=[255,153,0], IRON=[24,28,36], IRON_SOFT=[54,60,72],
  MUTED=[120,124,132], MUTED_SOFT=[168,172,180], BORDER=[222,224,230],
  BORDER_SOFT=[238,240,244], ZEBRA=[248,249,251], SURFACE=[253,253,254];
const MARGIN=40;
const ascii=(s)=>s.replace(/[\u2018\u2019\u201A\u201B]/g,"'").replace(/[\u201C-\u201F]/g,'"').replace(/[\u2013\u2014]/g,"-").replace(/\u2026/g,"...").replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\u00FF]/g,"");

const COMPANY={name:"M/S ATDB Trade International",tagline:"Your Project, Our Power.",email:"info@atdbtrade.com",phones:[{number:"+880 1711 123456"},{number:"+880 1811 987654"}]};
const PRIMARY_WHATSAPP="8801711123456";

const S={
  title:"Equipment Specification Sheet",
  subtitle:"Heavy Equipment Rental · Bangladesh",
  contact:"Contact ATDB Trade International",
  phoneL:"Phone",emailL:"Email",whatsappL:"WhatsApp",webL:"Web",
  disclaimer:"Specifications are indicative and may vary by unit. Inspection-certified, operator included, mobilisation on request.",
  generated:"Generated",ref:"Ref",
  category:"Category",brand:"Brand",model:"Model",capacity:"Capacity",
  origin:"Country of Origin",year:"Year of Manufacture",fuel:"Fuel",
  fleet:"Units in Fleet",operator:"Operator",
  operatorVal:"Certified operator included",inspection:"Inspection",
  inspectionVal:"City Inspection Services CIS/077/2018",
  assetId:"Asset ID",unitSuffix:"unit(s)",
  specsHeading:"Specifications",highlightsHeading:"Service Highlights",
  hAvailability:"Availability",hAvailabilityV:"Ready for site mobilisation",
  hMobilisation:"Coverage",hMobilisationV:"Nationwide deployment, 24/7 support",
  hCompliance:"Compliance",hComplianceV:"CIS-inspected · operator certified",
};
const eq={id:"ATDB-CR-002",name:"Liebherr LTM 1120 All-Terrain Crane",brand:"Liebherr",model:"LTM 1120",capacity:"120 T",origin:"Germany",year:2005,fuel:"Diesel",quantity:"02",category:"crane"};
const CATEGORIES={crane:{label:"Mobile Cranes"}};

// Real fixture image (load a small JPEG so the hero box has content)
const heroPath="src/assets/eq-crane-liebherr.webp";
let heroData=null;
try {
  // jsPDF wants JPEG/PNG dataURL — convert webp via sharp-equivalent... skip: use a tiny placeholder JPEG.
  // Generate a 1x1 grey JPEG dataURL as a stand-in (visual QA: hero box will show frame + tag, image is placeholder).
} catch{}

// ── Renderers (mirror header/specs-table/footer) ─────────────────
async function renderHeader(doc){
  const pageW=doc.internal.pageSize.getWidth();
  const bandH=78;
  doc.setFillColor(...IRON);doc.rect(0,0,pageW,bandH,"F");
  doc.setFillColor(...IRON_SOFT);doc.rect(0,bandH-18,pageW,18,"F");
  doc.setFillColor(...SAFETY);doc.rect(0,bandH,pageW,3,"F");

  const chipX=MARGIN,chipY=22,chipS=34;
  doc.setFillColor(...SAFETY);doc.roundedRect(chipX,chipY,chipS,chipS,4,4,"F");
  doc.setFont("helvetica","bold");doc.setFontSize(15);doc.setTextColor(...IRON);
  doc.text("A",chipX+chipS/2,chipY+chipS/2+5.5,{align:"center"});

  doc.setTextColor(255,255,255);doc.setFont("helvetica","bold");doc.setFontSize(13);
  doc.text(ascii(COMPANY.name),chipX+chipS+12,chipY+14);
  doc.setFont("helvetica","normal");doc.setFontSize(8.5);doc.setTextColor(200,204,212);
  doc.text(ascii(S.subtitle),chipX+chipS+12,chipY+28);

  doc.setFont("helvetica","normal");doc.setFontSize(7);doc.setTextColor(180,184,192);
  doc.text(S.ref.toUpperCase(),pageW-MARGIN,chipY+6,{align:"right"});
  doc.setFont("helvetica","bold");doc.setFontSize(13);doc.setTextColor(...SAFETY);
  doc.text(eq.id,pageW-MARGIN,chipY+22,{align:"right"});
  doc.setFont("helvetica","normal");doc.setFontSize(8);doc.setTextColor(180,184,192);
  doc.text(`${S.generated} 19 Apr 2026`,pageW-MARGIN,chipY+34,{align:"right"});

  let cursorY=bandH+28;
  doc.setFont("helvetica","normal");doc.setFontSize(8);doc.setTextColor(...MUTED);
  doc.text(ascii(S.title.toUpperCase()),MARGIN,cursorY);
  cursorY+=16;

  // Hero box (no real image — frame only for QA)
  const boxW=pageW-MARGIN*2,boxH=215;
  doc.setFillColor(...SURFACE);doc.setDrawColor(...BORDER);
  doc.roundedRect(MARGIN,cursorY,boxW,boxH,6,6,"FD");
  // Asset id tag
  const tagW=doc.getTextWidth(eq.id)+18;
  doc.setFillColor(...IRON);doc.roundedRect(MARGIN+10,cursorY+10,tagW,18,3,3,"F");
  doc.setFont("helvetica","bold");doc.setFontSize(8);doc.setTextColor(...SAFETY);
  doc.text(eq.id,MARGIN+10+tagW/2,cursorY+22,{align:"center"});
  // placeholder text in middle
  doc.setFont("helvetica","italic");doc.setFontSize(10);doc.setTextColor(...MUTED_SOFT);
  doc.text("[ Equipment Hero Image ]",MARGIN+boxW/2,cursorY+boxH/2,{align:"center"});
  cursorY+=boxH+22;

  doc.setTextColor(...IRON);doc.setFont("helvetica","bold");doc.setFontSize(22);
  doc.text(ascii(eq.name),MARGIN,cursorY);
  cursorY+=8;
  doc.setFillColor(...SAFETY);doc.rect(MARGIN,cursorY,36,2.5,"F");
  cursorY+=14;
  doc.setFont("helvetica","normal");doc.setFontSize(10);doc.setTextColor(...MUTED);
  doc.text(ascii(`${eq.brand}  ·  ${eq.capacity}  ·  ${eq.origin}  ·  ${eq.year}`),MARGIN,cursorY);
  cursorY+=18;

  // KPI strip
  const kpis=[[S.capacity,eq.capacity],[S.brand,eq.brand],[S.year,String(eq.year)]];
  const stripW=pageW-MARGIN*2,gap=8;
  const chipW=(stripW-gap*(kpis.length-1))/kpis.length,chipH=44;
  kpis.forEach(([l,v],i)=>{
    const x=MARGIN+i*(chipW+gap);
    doc.setFillColor(...SURFACE);doc.setDrawColor(...BORDER_SOFT);
    doc.roundedRect(x,cursorY,chipW,chipH,5,5,"FD");
    doc.setFillColor(...SAFETY);doc.rect(x,cursorY,2.5,chipH,"F");
    doc.setFont("helvetica","normal");doc.setFontSize(7);doc.setTextColor(...MUTED_SOFT);
    doc.text(ascii(l.toUpperCase()),x+12,cursorY+14);
    doc.setFont("helvetica","bold");doc.setFontSize(11);doc.setTextColor(...IRON);
    doc.text(ascii(v),x+12,cursorY+30);
  });
  cursorY+=chipH+22;
  return cursorY;
}

function renderTable(doc,startY){
  const pageW=doc.internal.pageSize.getWidth();
  doc.setFont("helvetica","bold");doc.setFontSize(11);doc.setTextColor(...IRON);
  doc.text(S.specsHeading,MARGIN,startY);
  doc.setFillColor(...SAFETY);doc.rect(MARGIN,startY+4,22,2,"F");
  const tableTop=startY+14;
  doc.setDrawColor(...BORDER);doc.setLineWidth(0.5);
  doc.line(MARGIN,tableTop,pageW-MARGIN,tableTop);
  const rows=[
    [S.assetId,eq.id],[S.category,CATEGORIES[eq.category].label],
    [S.brand,eq.brand],[S.model,eq.model],[S.capacity,eq.capacity],
    [S.origin,eq.origin],[S.year,String(eq.year)],[S.fuel,eq.fuel],
    [S.fleet,`${eq.quantity} ${S.unitSuffix}`],
    [S.operator,S.operatorVal],[S.inspection,S.inspectionVal],
  ];
  const rowH=20,tableW=pageW-MARGIN*2;
  const labelX=MARGIN+14,valueX=MARGIN+tableW*0.42,dividerX=MARGIN+tableW*0.42-14;
  rows.forEach((r,i)=>{
    const y=tableTop+i*rowH;
    if(i%2===0){doc.setFillColor(...ZEBRA);doc.rect(MARGIN,y,tableW,rowH,"F");}
    doc.setFont("helvetica","bold");doc.setFontSize(7.5);doc.setTextColor(...MUTED);
    doc.text(ascii(r[0].toUpperCase()),labelX,y+rowH/2+3);
    doc.setFont("helvetica","normal");doc.setFontSize(9.5);doc.setTextColor(...IRON);
    doc.text(ascii(r[1]),valueX,y+rowH/2+3);
  });
  const tableBottom=tableTop+rows.length*rowH;
  doc.setDrawColor(...BORDER_SOFT);doc.setLineWidth(0.4);
  doc.line(dividerX,tableTop,dividerX,tableBottom);
  doc.setDrawColor(...BORDER);doc.setLineWidth(0.5);
  doc.line(MARGIN,tableBottom,pageW-MARGIN,tableBottom);
  return tableBottom+18;
}

function renderFooter(doc,afterTableY){
  const pageW=doc.internal.pageSize.getWidth(),pageH=doc.internal.pageSize.getHeight();
  const highlightsY=afterTableY+4;
  const highlights=[[S.hAvailability,S.hAvailabilityV],[S.hMobilisation,S.hMobilisationV],[S.hCompliance,S.hComplianceV]];
  const stripW=pageW-MARGIN*2,gap=8;
  const chipW=(stripW-gap*(highlights.length-1))/highlights.length,chipH=50;
  highlights.forEach(([l,v],i)=>{
    const x=MARGIN+i*(chipW+gap);
    doc.setFillColor(...SURFACE);doc.setDrawColor(...BORDER_SOFT);
    doc.roundedRect(x,highlightsY,chipW,chipH,5,5,"FD");
    doc.setFillColor(...SAFETY);doc.rect(x+10,highlightsY+8,16,2,"F");
    doc.setFont("helvetica","bold");doc.setFontSize(8);doc.setTextColor(...IRON);
    doc.text(ascii(l.toUpperCase()),x+10,highlightsY+22);
    doc.setFont("helvetica","normal");doc.setFontSize(8.5);doc.setTextColor(...MUTED);
    const lines=doc.splitTextToSize(ascii(v),chipW-20);
    doc.text(lines,x+10,highlightsY+36);
  });

  const cardH=96,cardY=pageH-MARGIN-cardH-22;
  doc.setFillColor(...IRON);doc.roundedRect(MARGIN,cardY,pageW-MARGIN*2,cardH,6,6,"F");
  doc.setFillColor(...SAFETY);doc.rect(MARGIN,cardY,4,cardH,"F");
  doc.setFont("helvetica","bold");doc.setFontSize(11);doc.setTextColor(255,255,255);
  doc.text(ascii(S.contact),MARGIN+18,cardY+22);
  doc.setFont("helvetica","normal");doc.setFontSize(8.5);doc.setTextColor(200,204,212);
  doc.text(ascii(COMPANY.tagline),MARGIN+18,cardY+36);
  const phones=COMPANY.phones.map(p=>p.number).join("  ·  ");
  const colLY=cardY+56,colRX=MARGIN+(pageW-MARGIN*2)/2+4;
  const drawDetail=(label,value,x,y)=>{
    doc.setFont("helvetica","bold");doc.setFontSize(7);doc.setTextColor(...MUTED_SOFT);
    doc.text(ascii(label.toUpperCase()),x,y);
    doc.setFont("helvetica","normal");doc.setFontSize(9);doc.setTextColor(255,255,255);
    doc.text(ascii(value),x,y+12);
  };
  drawDetail(S.phoneL,phones,MARGIN+18,colLY);
  drawDetail(S.emailL,COMPANY.email,MARGIN+18,colLY+26);
  drawDetail(S.whatsappL,`+${PRIMARY_WHATSAPP}`,colRX,colLY);
  drawDetail(S.webL,"atdbtrade.com",colRX,colLY+26);

  doc.setDrawColor(...BORDER);doc.setLineWidth(0.4);
  doc.line(MARGIN,pageH-MARGIN-4,pageW-MARGIN,pageH-MARGIN-4);
  doc.setFont("helvetica","italic");doc.setFontSize(7);doc.setTextColor(...MUTED);
  const dl=doc.splitTextToSize(ascii(S.disclaimer),pageW-MARGIN*2-180);
  doc.text(dl,MARGIN,pageH-MARGIN+8);
  doc.setFont("helvetica","normal");doc.setFontSize(7);doc.setTextColor(...MUTED);
  doc.text(ascii(`${S.generated} 19 Apr 2026  ·  ${COMPANY.name}`),pageW-MARGIN,pageH-MARGIN+8,{align:"right"});
}

const doc=new jsPDF({unit:"pt",format:"a4"});
const a=await renderHeader(doc);
const b=renderTable(doc,a);
renderFooter(doc,b);
const out=doc.output("arraybuffer");
fs.writeFileSync("/tmp/spec-en.pdf",Buffer.from(out));
console.log("written /tmp/spec-en.pdf",fs.statSync("/tmp/spec-en.pdf").size,"bytes");
