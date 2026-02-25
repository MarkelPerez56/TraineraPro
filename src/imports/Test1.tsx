import clsx from "clsx";
import svgPaths from "./svg-kvc14gujl2";
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">{children}</div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}
type LinkProps = {
  additionalClassNames?: string;
};

function Link({ children, additionalClassNames = "" }: React.PropsWithChildren<LinkProps>) {
  return (
    <div className={clsx("h-[44px] relative rounded-[10px] shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function Icon1({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper>
      <g id="Icon">{children}</g>
    </Wrapper>
  );
}
type ParagraphTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ParagraphText({ text, additionalClassNames = "" }: ParagraphTextProps) {
  return (
    <div className={clsx("h-[18px] relative shrink-0 w-full", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#717182] text-[12px] top-px">{text}</p>
    </div>
  );
}
type IconProps = {
  additionalClassNames?: string;
};

function Icon({ additionalClassNames = "" }: IconProps) {
  return (
    <div className={clsx("absolute size-[16px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-0.5px] tracking-[-0.3125px]">{text}</p>
    </div>
  );
}

export default function Test() {
  return (
    <div className="bg-white relative size-full" data-name="Test 1">
      <div className="absolute bg-white content-stretch flex flex-col h-[750px] items-start left-0 top-0 w-[1129px]" data-name="T0">
        <div className="bg-white h-[750px] relative shrink-0 w-full" data-name="Container">
          <div className="content-stretch flex items-start pl-[288px] pt-[32px] relative size-full">
            <Wrapper1 additionalClassNames="h-[312px] w-[809px]">
              <div className="content-stretch flex flex-col gap-[4px] h-[64px] items-start relative shrink-0 w-full" data-name="Container">
                <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 1">
                  <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[36px] left-0 not-italic text-[#0a0a0a] text-[24px] top-0 tracking-[0.0703px]">Test</p>
                </div>
                <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Registra los test de tus remeros</p>
                </div>
                <div className="absolute bg-[#030213] h-[36px] left-[662px] rounded-[8px] top-[28px] w-[146.898px]" data-name="Button">
                  <Icon additionalClassNames="left-[12px] top-[10px]" />
                  <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[89.5px] not-italic text-[14px] text-center text-white top-[8.5px] tracking-[-0.1504px]">Nuevo Test</p>
                </div>
              </div>
            </Wrapper1>
          </div>
        </div>
        <div className="h-0 shrink-0 w-full" data-name="Section" />
      </div>
      <div className="absolute bg-white content-stretch flex flex-col h-[750px] items-start left-0 pr-px top-0 w-[256px]" data-name="Sidebar">
        <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-r border-solid inset-0 pointer-events-none" />
        <div className="h-[77px] relative shrink-0 w-[255px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[16px] relative size-full">
            <div className="bg-[#030213] relative rounded-[14px] shrink-0 size-[40px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                <Icon1>
                  <path d={svgPaths.p102c1b00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.p74e0180} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.p23133180} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </Icon1>
              </div>
            </div>
            <Wrapper1 additionalClassNames="h-[45px] w-[94.82px]">
              <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 3">
                <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-0 not-italic text-[#0a0a0a] text-[18px] top-[0.5px] tracking-[-0.4395px]">TraineraPro</p>
              </div>
              <ParagraphText text="Gestion de remo" />
            </Wrapper1>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0.1)] h-px shrink-0 w-[255px]" data-name="Primitive.div" />
        <div className="flex-[1_0_0] min-h-px min-w-px relative w-[255px]" data-name="Navigation">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pt-[12px] px-[12px] relative size-full">
            <Link>
              <Icon1>
                <path d={svgPaths.p1fc96a00} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p33089d00} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p49cfa80} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p1cfbf300} id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </Icon1>
              <div className="h-[24px] relative shrink-0 w-[38.055px]" data-name="Text">
                <Text text="Inicio" />
              </div>
            </Link>
            <Link>
              <Icon1>
                <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p2c4f400} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.pae3c380} id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </Icon1>
              <div className="h-[24px] relative shrink-0 w-[56.25px]" data-name="Text">
                <Text text="Plantilla" />
              </div>
            </Link>
            <Link>
              <Icon1>
                <path d={svgPaths.p90d900} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p2b32d000} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M5.83333 17.5H14.1667" id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M10 2.5V17.5" id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p1bfd9980} id="Vector_5" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </Icon1>
              <div className="h-[24px] relative shrink-0 w-[55.547px]" data-name="Text">
                <Text text="Pesajes" />
              </div>
            </Link>
            <Link>
              <Wrapper>
                <g clipPath="url(#clip0_23_804)" id="Icon">
                  <path d="M10 18.3333V6.66667" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.pf667c00} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.p15f30980} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </g>
                <defs>
                  <clipPath id="clip0_23_804">
                    <rect fill="white" height="20" width="20" />
                  </clipPath>
                </defs>
              </Wrapper>
              <div className="h-[24px] relative shrink-0 w-[91.547px]" data-name="Text">
                <Text text="Alineaciones" />
              </div>
            </Link>
            <Link>
              <Icon1>
                <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M6.66667 11.6667H6.675" id="Vector_5" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M10 11.6667H10.0083" id="Vector_6" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M13.3333 11.6667H13.3417" id="Vector_7" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M6.66667 15H6.675" id="Vector_8" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M10 15H10.0083" id="Vector_9" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M13.3333 15H13.3417" id="Vector_10" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </Icon1>
              <div className="h-[24px] relative shrink-0 w-[77.836px]" data-name="Text">
                <Text text="Calendario" />
              </div>
            </Link>
            <Link additionalClassNames="bg-black">
              <div className="relative shrink-0 size-[20px]" data-name="Target">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute inset-[8.33%]" data-name="Icon">
                    <div className="absolute inset-[-4.8%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.2667 18.2667">
                        <g id="Icon">
                          <path d={svgPaths.p6cf8680} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                          <path d={svgPaths.p239c8cf0} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                          <path d={svgPaths.pb0d4200} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[24px] relative shrink-0 w-[59.047px]" data-name="Text">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-white top-[-0.5px] tracking-[-0.3125px]">Test</p>
                </div>
              </div>
            </Link>
            <Link>
              <Icon1>
                <path d={svgPaths.p2026e800} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p32ab0300} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </Icon1>
              <div className="h-[24px] relative shrink-0 w-[59.047px]" data-name="Text">
                <Text text="Mi Perfil" />
              </div>
            </Link>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0.1)] h-px shrink-0 w-[255px]" data-name="Primitive.div" />
        <div className="h-[119px] relative shrink-0 w-[255px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pt-[16px] px-[16px] relative size-full">
            <div className="h-[39px] relative shrink-0 w-full" data-name="Container">
              <div className="absolute content-stretch flex flex-col h-[39px] items-start left-[48px] top-0 w-[175px]" data-name="Container">
                <div className="h-[21px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#0a0a0a] text-[14px] top-0 tracking-[-0.1504px]">Markel Perez</p>
                </div>
                <ParagraphText text="markelpo@gmail.com" additionalClassNames="overflow-clip" />
              </div>
              <div className="absolute content-stretch flex items-start left-0 overflow-clip rounded-[16777200px] size-[36px] top-[1.5px]" data-name="Primitive.span">
                <div className="bg-[#eceef2] flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] tracking-[-0.3125px]">MP</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
              <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <div className="absolute left-[54.47px] size-[16px] top-[10px]" data-name="Icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g id="Icon">
                    <path d={svgPaths.p12257fa0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d={svgPaths.p2c1f680} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d="M14 8H6" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </g>
                </svg>
              </div>
              <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[123.47px] not-italic text-[#0a0a0a] text-[14px] text-center top-[8.5px] tracking-[-0.1504px]">Cerrar Sesion</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-white content-stretch flex flex-col h-[203px] items-start left-[288px] p-px rounded-[14px] top-[124px] w-[809px]" data-name="Je">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <div className="flex-[1_0_0] min-h-px min-w-px relative w-[807px]" data-name="rt">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
            <div className="absolute left-[379.5px] size-[48px] top-[48px]" data-name="Icon">
              <div className="absolute inset-[-4.17%_-5.21%_-4.17%_-3.13%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
                  <g id="Icon">
                    <g id="Icon_2">
                      <path d={svgPaths.p24b4e980} stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                      <path d={svgPaths.p3b2d96f0} stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                      <path d={svgPaths.p2881f141} stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div className="absolute h-[21px] left-[24px] top-[108px] w-[759px]" data-name="cne">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[380.14px] not-italic text-[#717182] text-[14px] text-center top-0 tracking-[-0.1504px]">No hay test creados</p>
            </div>
            <div className="absolute bg-[#030213] h-[32px] left-[299.86px] rounded-[8px] top-[145px] w-[207.273px]" data-name="ke">
              <Icon additionalClassNames="left-[41.14px] top-[8px]" />
              <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[117px] not-italic text-[14px] text-center text-white top-[6.5px] tracking-[-0.1504px]">Crear primer test</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}