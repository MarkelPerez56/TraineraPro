import clsx from "clsx";
import svgPaths from "./svg-eyymwr1j9p";
type Container6Props = {
  additionalClassNames?: string;
};

function Container6({ children, additionalClassNames = "" }: React.PropsWithChildren<Container6Props>) {
  return (
    <div className={clsx("h-[31.594px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-center relative size-full">{children}</div>
    </div>
  );
}
type Container5Props = {
  additionalClassNames?: string;
};

function Container5({ children, additionalClassNames = "" }: React.PropsWithChildren<Container5Props>) {
  return (
    <div className={clsx("absolute h-[94.398px] w-[179px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pt-[16px] px-[24px] relative size-full">{children}</div>
    </div>
  );
}

function Container4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[318px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pt-[16px] px-[16px] relative size-full">{children}</div>
    </div>
  );
}
type Wrapper11Props = {
  additionalClassNames?: string;
};

function Wrapper11({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper11Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}
type Wrapper10Props = {
  additionalClassNames?: string;
};

function Wrapper10({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper10Props>) {
  return <Wrapper11 additionalClassNames={clsx("flex-[1_0_0] min-h-px min-w-px relative", additionalClassNames)}>{children}</Wrapper11>;
}
type Wrapper9Props = {
  additionalClassNames?: string;
};

function Wrapper9({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper9Props>) {
  return <Wrapper11 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</Wrapper11>;
}

function Icon4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[12px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        {children}
      </svg>
    </div>
  );
}
type Container3Props = {
  additionalClassNames?: string;
};

function Container3({ children, additionalClassNames = "" }: React.PropsWithChildren<Container3Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">{children}</div>
    </div>
  );
}

function Button({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 size-[36px]">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">{children}</div>
    </div>
  );
}
type Wrapper8Props = {
  additionalClassNames?: string;
};

function Wrapper8({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper8Props>) {
  return (
    <div className={clsx("flex-[1_0_0] min-h-px min-w-px relative", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">{children}</div>
    </div>
  );
}

function Wrapper7({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[14px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">{children}</div>
    </div>
  );
}

function Wrapper6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type Wrapper5Props = {
  additionalClassNames?: string;
};

function Wrapper5({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper5Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type Wrapper4Props = {
  additionalClassNames?: string;
};

function Wrapper4({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper4Props>) {
  return (
    <div className={clsx("bg-[#030213] relative rounded-[8px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div className={additionalClassNames}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
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

function Icon3({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper2>
      <g id="Icon">{children}</g>
    </Wrapper2>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <Wrapper3 additionalClassNames={additionalClassNames}>
      <g id="Icon">{children}</g>
    </Wrapper3>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return <Wrapper1 additionalClassNames={clsx("size-[16px]", additionalClassNames)}>{children}</Wrapper1>;
}
type Vector1Props = {
  additionalClassNames?: string;
};

function Vector1({ children, additionalClassNames = "" }: React.PropsWithChildren<Vector1Props>) {
  return (
    <div className={clsx("absolute bottom-[20.83%] top-[20.83%]", additionalClassNames)}>
      <div className="absolute inset-[-7.14%_-14.29%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.25 9.33333">
          {children}
        </svg>
      </div>
    </div>
  );
}

function Vector({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2">
      <div className="absolute inset-[-0.58px_-7.14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 1.16667">
          {children}
        </svg>
      </div>
    </div>
  );
}
type TextText2Props = {
  text: string;
  additionalClassNames?: string;
};

function TextText2({ text, additionalClassNames = "" }: TextText2Props) {
  return (
    <Wrapper6 additionalClassNames={additionalClassNames}>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.6px] left-0 not-italic text-[#fb2c36] text-[10.4px] top-[-0.5px] tracking-[0.0975px]">{text}</p>
    </Wrapper6>
  );
}

function Container2() {
  return (
    <Wrapper7>
      <Wrapper8 additionalClassNames="h-[14px]">
        <Vector>
          <path d="M0.583333 0.583333H8.75" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </Vector>
        <Vector1 additionalClassNames="left-1/2 right-[20.83%]">
          <path d={svgPaths.p1ab1aba0} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </Vector1>
      </Wrapper8>
    </Wrapper7>
  );
}
type ParagraphText2Props = {
  text: string;
  additionalClassNames?: string;
};

function ParagraphText2({ text, additionalClassNames = "" }: ParagraphText2Props) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.8px] left-[83.13px] not-italic text-[#c10007] text-[11.2px] text-center top-[0.41px] tracking-[0.0525px]">{text}</p>
    </div>
  );
}

function Container1() {
  return (
    <Wrapper7>
      <Wrapper8 additionalClassNames="h-[14px]">
        <Vector1 additionalClassNames="left-[20.83%] right-1/2">
          <path d={svgPaths.p221f49e0} id="Vector" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </Vector1>
        <Vector>
          <path d="M8.75 0.583333H0.583333" id="Vector" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </Vector>
      </Wrapper8>
    </Wrapper7>
  );
}
type ParagraphText1Props = {
  text: string;
};

function ParagraphText1({ text }: ParagraphText1Props) {
  return (
    <div className="h-[16.805px] relative shrink-0 w-full">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.8px] left-[83.09px] not-italic text-[#c10007] text-[11.2px] text-center top-[0.41px] tracking-[0.0525px]">{text}</p>
    </div>
  );
}
type TextText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TextText1({ text, additionalClassNames = "" }: TextText1Props) {
  return (
    <Wrapper6 additionalClassNames={additionalClassNames}>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.6px] left-0 not-italic text-[#717182] text-[10.4px] top-[-0.5px] tracking-[0.0975px]">{text}</p>
    </Wrapper6>
  );
}

function Container() {
  return (
    <Wrapper7>
      <Wrapper8 additionalClassNames="h-[14px]">
        <Vector>
          <path d="M0.583333 0.583333H8.75" id="Vector" stroke="var(--stroke-0, #FF6467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </Vector>
        <Vector1 additionalClassNames="left-1/2 right-[20.83%]">
          <path d={svgPaths.p1ab1aba0} id="Vector" stroke="var(--stroke-0, #FF6467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </Vector1>
      </Wrapper8>
    </Wrapper7>
  );
}
type ParagraphTextProps = {
  text: string;
};

function ParagraphText({ text }: ParagraphTextProps) {
  return (
    <div className="h-[19.195px] relative shrink-0 w-full">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[83.09px] not-italic text-[#0a0a0a] text-[12.8px] text-center top-[-0.09px] tracking-[-0.06px]">{text}</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p6fbfe00} id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M2.33333 12.8333V8.75" id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}
type Text1Props = {
  text: string;
  additionalClassNames?: string;
};

function Text1({ text, additionalClassNames = "" }: Text1Props) {
  return (
    <div className={clsx("h-[18px] relative shrink-0 w-full", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#717182] text-[12px] top-px">{text}</p>
    </div>
  );
}
type TextTextProps = {
  text: string;
};

function TextText({ text }: TextTextProps) {
  return (
    <Wrapper8 additionalClassNames="h-[14.398px]">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14.4px] left-0 not-italic text-[#030213] text-[9.6px] top-[-1px] tracking-[0.1388px]">{text}</p>
    </Wrapper8>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[10px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p2202d080} id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
          <path d="M1.66667 9.16667V6.25" id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
        </g>
      </svg>
    </div>
  );
}
type ContainerText1Props = {
  text: string;
};

function ContainerText1({ text }: ContainerText1Props) {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[4px] rounded-[16777200px] size-[24px] top-[4px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px]">{text}</p>
    </div>
  );
}
type ContainerTextProps = {
  text: string;
};

function ContainerText({ text }: ContainerTextProps) {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[4px] rounded-[16777200px] size-[24px] top-[4px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(113,113,130,0.5)]">{text}</p>
    </div>
  );
}
type IconProps = {
  additionalClassNames?: string;
};

function Icon({ additionalClassNames = "" }: IconProps) {
  return (
    <Wrapper1 additionalClassNames={clsx("absolute size-[16px]", additionalClassNames)}>
      <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Wrapper1>
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

export default function AlineacionesEnCalendario() {
  return (
    <div className="bg-white relative size-full" data-name="Alineaciones en Calendario">
      <div className="absolute bg-white content-stretch flex flex-col h-[750px] items-start left-0 top-0 w-[1129px]" data-name="T0">
        <div className="bg-white h-[750px] relative shrink-0 w-full" data-name="Container">
          <div className="content-stretch flex items-start pl-[288px] pt-[32px] relative size-full">
            <div className="h-[660px] relative shrink-0 w-[809px]" data-name="Main Content">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
                <div className="content-stretch flex h-[64px] items-center justify-between relative shrink-0 w-full" data-name="Container">
                  <div className="h-[64px] relative shrink-0 w-[368.789px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
                      <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 1">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[36px] left-0 not-italic text-[#0a0a0a] text-[24px] top-0 tracking-[0.0703px]">Calendario</p>
                      </div>
                      <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Planifica las fechas de regata y asigna alineaciones</p>
                      </div>
                    </div>
                  </div>
                  <Wrapper4 additionalClassNames="h-[36px] w-[146.898px]">
                    <Icon additionalClassNames="left-[12px] top-[10px]" />
                    <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[89px] not-italic text-[14px] text-center text-white top-[8.5px] tracking-[-0.1504px]">Nuevo Evento</p>
                  </Wrapper4>
                </div>
                <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[__minmax(0,465fr)_minmax(0,1fr)] grid-rows-[repeat(2,minmax(0,1fr))] h-[571px] relative shrink-0 w-full" data-name="Container">
                  <div className="bg-white col-1 content-stretch flex flex-col h-[571px] items-start justify-self-start p-px relative rounded-[14px] row-1 self-start shrink-0 w-[464px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
                    <Wrapper6 additionalClassNames="w-[463px]">
                      <div className="absolute content-stretch flex h-[36px] items-center justify-between left-[16px] top-[16px] w-[431px]" data-name="Container">
                        <Button>
                          <Wrapper additionalClassNames="relative shrink-0">
                            <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </Wrapper>
                        </Button>
                        <Wrapper5 additionalClassNames="h-[26.398px] w-[112.156px]">
                          <p className="absolute capitalize font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.4px] left-0 not-italic text-[#0a0a0a] text-[17.6px] top-[-0.5px] tracking-[-0.4366px]">febrero 2026</p>
                        </Wrapper5>
                        <Button>
                          <Wrapper additionalClassNames="relative shrink-0">
                            <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </Wrapper>
                        </Button>
                      </div>
                      <div className="absolute h-[34px] left-[16px] top-[68px] w-[431px]" data-name="Container">
                        <div className="absolute h-[34px] left-0 top-0 w-[61.57px]" data-name="Container">
                          <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[31.14px] not-italic text-[#717182] text-[12px] text-center top-[9px]">Lun</p>
                        </div>
                        <div className="absolute h-[34px] left-[61.57px] top-0 w-[61.57px]" data-name="Container">
                          <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[31.2px] not-italic text-[#717182] text-[12px] text-center top-[9px]">Mar</p>
                        </div>
                        <div className="absolute h-[34px] left-[123.14px] top-0 w-[61.57px]" data-name="Container">
                          <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[30.92px] not-italic text-[#717182] text-[12px] text-center top-[9px]">Mie</p>
                        </div>
                        <div className="absolute h-[34px] left-[184.71px] top-0 w-[61.57px]" data-name="Container">
                          <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[30.85px] not-italic text-[#717182] text-[12px] text-center top-[9px]">Jue</p>
                        </div>
                        <div className="absolute h-[34px] left-[246.28px] top-0 w-[61.57px]" data-name="Container">
                          <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[31.09px] not-italic text-[#717182] text-[12px] text-center top-[9px]">Vie</p>
                        </div>
                        <div className="absolute h-[34px] left-[307.85px] top-0 w-[61.57px]" data-name="Container">
                          <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[31.25px] not-italic text-[#717182] text-[12px] text-center top-[9px]">Sab</p>
                        </div>
                        <div className="absolute h-[34px] left-[369.42px] top-0 w-[61.578px]" data-name="Container">
                          <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[30.94px] not-italic text-[#717182] text-[12px] text-center top-[9px]">Dom</p>
                        </div>
                      </div>
                      <div className="absolute h-[440px] left-[16px] top-[106px] w-[431px]" data-name="Container">
                        <div className="absolute bg-[rgba(236,236,240,0.2)] border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-0 top-0 w-[61.57px]" data-name="Container">
                          <ContainerText text="26" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute bg-[rgba(236,236,240,0.2)] border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[61.57px] top-0 w-[61.57px]" data-name="Container">
                          <ContainerText text="27" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute bg-[rgba(236,236,240,0.2)] border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[123.14px] top-0 w-[61.57px]" data-name="Container">
                          <ContainerText text="28" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute bg-[rgba(236,236,240,0.2)] border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[184.71px] top-0 w-[61.57px]" data-name="Container">
                          <ContainerText text="29" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute bg-[rgba(236,236,240,0.2)] border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[246.28px] top-0 w-[61.57px]" data-name="Container">
                          <ContainerText text="30" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute bg-[rgba(236,236,240,0.2)] border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[307.85px] top-0 w-[61.57px]" data-name="Container">
                          <ContainerText text="31" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[369.42px] top-0 w-[61.578px]" data-name="Container">
                          <ContainerText1 text="1" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.578px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-0 top-[88px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="2" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[61.57px] top-[88px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="3" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[123.14px] top-[88px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="4" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[184.71px] top-[88px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="5" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[246.28px] top-[88px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="6" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[307.85px] top-[88px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="7" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[369.42px] top-[88px] w-[61.578px]" data-name="Container">
                          <ContainerText1 text="8" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.578px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-0 top-[176px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="9" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[61.57px] top-[176px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="10" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[123.14px] top-[176px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="11" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[184.71px] top-[176px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="12" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[246.28px] top-[176px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="13" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[307.85px] top-[176px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="14" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[369.42px] top-[176px] w-[61.578px]" data-name="Container">
                          <ContainerText1 text="15" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.578px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-0 top-[264px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="16" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[61.57px] top-[264px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="17" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[123.14px] top-[264px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="18" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[184.71px] top-[264px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="19" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[246.28px] top-[264px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="20" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute bg-[rgba(3,2,19,0.05)] border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[307.85px] top-[264px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="21" />
                          <div className="absolute bg-[rgba(3,2,19,0.1)] content-stretch flex gap-[4px] h-[20.398px] items-center left-[4px] px-[5px] py-px rounded-[4px] top-[30px] w-[51.57px]" data-name="Container">
                            <div aria-hidden="true" className="absolute border border-[rgba(3,2,19,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                            <Icon1 />
                            <TextText text="Hondarribi" />
                          </div>
                          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_#030213]" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[369.42px] top-[264px] w-[61.578px]" data-name="Container">
                          <ContainerText1 text="22" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.578px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-0 top-[352px] w-[61.57px]" data-name="Container">
                          <div className="absolute bg-[#030213] content-stretch flex items-center justify-center left-[4px] rounded-[16777200px] size-[24px] top-[4px]" data-name="Container">
                            <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[12px] text-white">23</p>
                          </div>
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[61.57px] top-[352px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="24" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[123.14px] top-[352px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="25" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[184.71px] top-[352px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="26" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[246.28px] top-[352px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="27" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[307.85px] top-[352px] w-[61.57px]" data-name="Container">
                          <ContainerText1 text="28" />
                          <div className="absolute h-0 left-[4px] top-[30px] w-[51.57px]" data-name="Container" />
                        </div>
                        <div className="absolute bg-[rgba(236,236,240,0.2)] border border-[rgba(0,0,0,0.05)] border-solid h-[88px] left-[369.42px] top-[352px] w-[61.578px]" data-name="Container">
                          <ContainerText text="1" />
                          <div className="absolute bg-[rgba(3,2,19,0.1)] content-stretch flex gap-[4px] h-[20.398px] items-center left-[4px] px-[5px] py-px rounded-[4px] top-[30px] w-[51.578px]" data-name="Container">
                            <div aria-hidden="true" className="absolute border border-[rgba(3,2,19,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                            <Icon1 />
                            <TextText text="Castro Urdiales" />
                          </div>
                        </div>
                      </div>
                    </Wrapper6>
                    <div className="absolute bg-white h-[194px] left-[492px] rounded-[14px] top-[-1px] w-[319px]" data-name="Container">
                      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative size-full">
                        <Container4>
                          <div className="content-stretch flex h-[42px] items-center justify-between relative shrink-0 w-full" data-name="Container">
                            <Container3 additionalClassNames="h-[42px] w-[166.25px]">
                              <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                                <p className="absolute capitalize font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#0a0a0a] text-[16px] top-[-0.5px] tracking-[-0.3125px]">sábado 21 de febrero</p>
                              </div>
                              <Text1 text="1 evento" />
                            </Container3>
                            <Wrapper4 additionalClassNames="h-[32px] w-[89.086px]">
                              <Icon additionalClassNames="left-[10px] top-[8px]" />
                              <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[58px] not-italic text-[14px] text-center text-white top-[6.5px] tracking-[-0.1504px]">Anadir</p>
                            </Wrapper4>
                          </div>
                          <div className="bg-white h-[97.594px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
                            <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
                            <div className="content-stretch flex flex-col items-start pb-px pt-[13px] px-[13px] relative size-full">
                              <div className="content-stretch flex h-[71.594px] items-start justify-between relative shrink-0 w-full" data-name="Container">
                                <Wrapper6 additionalClassNames="h-[71.594px]">
                                  <div className="absolute content-stretch flex gap-[8px] h-[21.594px] items-center left-0 top-0 w-[194px]" data-name="Container">
                                    <Icon2 />
                                    <div className="h-[21.594px] relative shrink-0 w-[73.57px]" data-name="Paragraph">
                                      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                                        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21.6px] left-0 not-italic text-[#0a0a0a] text-[14.4px] top-0 tracking-[-0.1828px]">Hondarribi</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="absolute content-stretch flex gap-[6px] h-[18px] items-center left-[20px] top-[25.59px] w-[174px]" data-name="Container">
                                    <Icon4>
                                      <g clipPath="url(#clip0_50_537)" id="Icon">
                                        <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_50_537">
                                          <rect fill="white" height="12" width="12" />
                                        </clipPath>
                                      </defs>
                                    </Icon4>
                                    <Wrapper5 additionalClassNames="h-[18px] w-[30.906px]">
                                      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#717182] text-[12px] top-px">16:27</p>
                                    </Wrapper5>
                                  </div>
                                  <div className="absolute content-stretch flex gap-[6px] h-[22px] items-center left-[20px] top-[49.59px] w-[174px]" data-name="Container">
                                    <Icon4>
                                      <g clipPath="url(#clip0_50_528)" id="Icon">
                                        <path d="M6 11V4" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d={svgPaths.p3775568} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d={svgPaths.p24224a00} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_50_528">
                                          <rect fill="white" height="12" width="12" />
                                        </clipPath>
                                      </defs>
                                    </Icon4>
                                    <div className="bg-[#eceef2] h-[22px] relative rounded-[8px] shrink-0 w-[79.188px]" data-name="Text">
                                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
                                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px]">Hondarribi</p>
                                      </div>
                                      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                                    </div>
                                  </div>
                                </Wrapper6>
                                <div className="h-[28px] relative shrink-0 w-[58px]" data-name="Container">
                                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-center relative size-full">
                                    <Wrapper9 additionalClassNames="rounded-[8px] size-[28px]">
                                      <Wrapper3 additionalClassNames="relative shrink-0 size-[16px]">
                                        <g clipPath="url(#clip0_50_512)" id="Icon">
                                          <path d={svgPaths.p1ba32a00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                          <path d="M10 3.33333L12.6667 6" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_50_512">
                                            <rect fill="white" height="16" width="16" />
                                          </clipPath>
                                        </defs>
                                      </Wrapper3>
                                    </Wrapper9>
                                    <Wrapper10 additionalClassNames="h-[28px] rounded-[8px]">
                                      <Wrapper additionalClassNames="relative shrink-0">
                                        <path d="M2 4H14" id="Vector" stroke="var(--stroke-0, #D4183D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                        <path d={svgPaths.p64eb800} id="Vector_2" stroke="var(--stroke-0, #D4183D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                        <path d={svgPaths.p56ef700} id="Vector_3" stroke="var(--stroke-0, #D4183D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                        <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="var(--stroke-0, #D4183D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                        <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="var(--stroke-0, #D4183D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                      </Wrapper>
                                    </Wrapper10>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Container4>
                      </div>
                    </div>
                  </div>
                  <div className="col-1 justify-self-stretch row-2 self-stretch shrink-0" data-name="Container" />
                  <div className="absolute bg-white content-stretch flex flex-col h-[125px] items-start left-[492px] p-px rounded-[14px] top-[200px] w-[319px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
                    <Container4>
                      <div className="h-[19.195px] relative shrink-0 w-full" data-name="Paragraph">
                        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-0 not-italic text-[#717182] text-[12.8px] top-0 tracking-[-0.06px]">Proximas regatas</p>
                      </div>
                      <div className="h-[52px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[8px] items-center px-[8px] relative size-full">
                            <Wrapper9 additionalClassNames="bg-[rgba(3,2,19,0.1)] rounded-[10px] size-[32px]">
                              <Icon2 />
                            </Wrapper9>
                            <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Container">
                              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                                <div className="h-[19.195px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
                                  <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.2px] left-0 not-italic text-[#0a0a0a] text-[12.8px] top-0 tracking-[-0.06px]">Castro Urdiales</p>
                                </div>
                                <div className="h-[16.805px] relative shrink-0 w-full" data-name="Paragraph">
                                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#717182] text-[11.2px] top-[0.5px] tracking-[0.0525px]">1 mar</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Container4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-0 shrink-0 w-full" data-name="Section" />
      </div>
      <div className="absolute bg-white content-stretch flex flex-col h-[750px] items-start left-0 pr-px top-0 w-[256px]" data-name="Sidebar">
        <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-r border-solid inset-0 pointer-events-none" />
        <div className="h-[77px] relative shrink-0 w-[255px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[16px] relative size-full">
            <Wrapper9 additionalClassNames="bg-[#030213] rounded-[14px] size-[40px]">
              <Icon3>
                <path d={svgPaths.p102c1b00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p74e0180} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p23133180} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </Icon3>
            </Wrapper9>
            <Container3 additionalClassNames="h-[45px] w-[94.82px]">
              <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 3">
                <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-0 not-italic text-[#0a0a0a] text-[18px] top-[0.5px] tracking-[-0.4395px]">TraineraPro</p>
              </div>
              <Text1 text="Gestion de remo" />
            </Container3>
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0.1)] h-px shrink-0 w-[255px]" data-name="Primitive.div" />
        <div className="flex-[1_0_0] min-h-px min-w-px relative w-[255px]" data-name="Navigation">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pt-[12px] px-[12px] relative size-full">
            <Link>
              <Icon3>
                <path d={svgPaths.p1fc96a00} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p33089d00} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p49cfa80} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p1cfbf300} id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </Icon3>
              <div className="h-[24px] relative shrink-0 w-[38.055px]" data-name="Text">
                <Text text="Inicio" />
              </div>
            </Link>
            <Link>
              <Icon3>
                <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p2c4f400} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.pae3c380} id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </Icon3>
              <div className="h-[24px] relative shrink-0 w-[56.25px]" data-name="Text">
                <Text text="Plantilla" />
              </div>
            </Link>
            <Link>
              <Icon3>
                <path d={svgPaths.p90d900} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p2b32d000} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M5.83333 17.5H14.1667" id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M10 2.5V17.5" id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p1bfd9980} id="Vector_5" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </Icon3>
              <div className="h-[24px] relative shrink-0 w-[55.547px]" data-name="Text">
                <Text text="Pesajes" />
              </div>
            </Link>
            <Link>
              <Wrapper2>
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
              </Wrapper2>
              <div className="h-[24px] relative shrink-0 w-[91.547px]" data-name="Text">
                <Text text="Alineaciones" />
              </div>
            </Link>
            <Link additionalClassNames="bg-[#030213]">
              <Icon3>
                <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M6.66667 11.6667H6.675" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M10 11.6667H10.0083" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M13.3333 11.6667H13.3417" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M6.66667 15H6.675" id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M10 15H10.0083" id="Vector_9" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d="M13.3333 15H13.3417" id="Vector_10" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </Icon3>
              <Wrapper5 additionalClassNames="h-[24px] w-[77.836px]">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-white top-[-0.5px] tracking-[-0.3125px]">Calendario</p>
              </Wrapper5>
            </Link>
            <Link>
              <Icon3>
                <path d={svgPaths.p2026e800} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p32ab0300} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </Icon3>
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
                <Text1 text="markelpo@gmail.com" additionalClassNames="overflow-clip" />
              </div>
              <div className="absolute content-stretch flex items-start left-0 overflow-clip rounded-[16777200px] size-[36px] top-[1.5px]" data-name="Primitive.span">
                <Wrapper10 additionalClassNames="bg-[#eceef2] h-[36px] rounded-[16777200px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] tracking-[-0.3125px]">MP</p>
                </Wrapper10>
              </div>
            </div>
            <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
              <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <Wrapper additionalClassNames="absolute left-[54.47px] top-[10px]">
                <path d={svgPaths.p12257fa0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d={svgPaths.p2c1f680} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d="M14 8H6" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </Wrapper>
              <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[123.47px] not-italic text-[#0a0a0a] text-[14px] text-center top-[8.5px] tracking-[-0.1504px]">Cerrar Sesion</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[750px] items-center justify-center left-0 top-px w-[1129px]">
        <div className="-scale-y-100 flex-none">
          <div className="bg-black h-[750px] opacity-52 w-[1129px]" />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[334px] pt-[17px] px-[16px] top-[65px] w-[429px]" data-name="Container">
        <div className="absolute bg-white h-[611px] left-0 rounded-[21px] top-[-8px] w-[429px]">
          <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[21px]" />
        </div>
        <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[81px] relative shrink-0 w-[396px]" data-name="Container">
          <div className="bg-white col-1 content-stretch flex flex-col h-[73px] items-start p-px relative rounded-[14px] row-1 shrink-0 w-[91px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
            <Container5 additionalClassNames="left-[-44px] top-[-6px]">
              <div className="h-[16.805px] relative shrink-0 w-full" data-name="Container">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-[65.5px] not-italic text-[#717182] text-[11.2px] text-center top-[0.5px] tracking-[0.0525px]">Peso Medio</p>
              </div>
              <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
                <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[0] left-[65.79px] not-italic text-[#0a0a0a] text-[0px] text-[16px] text-center top-[0.5px] tracking-[-0.1969px]">
                  <span className="leading-[33.6px]">{`73.7 `}</span>
                  <span className="leading-[19.2px] text-[#717182] tracking-[-0.06px]">kg</span>
                </p>
              </div>
            </Container5>
          </div>
          <div className="bg-white col-2 content-stretch flex flex-col h-[73px] items-start p-px relative rounded-[14px] row-1 shrink-0 w-[91px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
            <Container5 additionalClassNames="left-[-53px] top-[-5px]">
              <div className="h-[16.805px] relative shrink-0 w-full" data-name="Container">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-[75.84px] not-italic text-[#717182] text-[11.2px] text-center top-[0.5px] tracking-[0.0525px]">Edad Media</p>
              </div>
              <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
                <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[0] left-[75px] not-italic text-[#0a0a0a] text-[16px] text-center top-[0.2px] tracking-[-0.1969px]">
                  <span className="leading-[33.6px]">{`24.0 `}</span>
                  <span className="leading-[33.6px] text-[#717182]">años</span>
                  <span className="leading-[33.6px]">{` `}</span>
                </p>
              </div>
            </Container5>
          </div>
          <div className="bg-white col-3 content-stretch flex flex-col h-[73px] items-start p-px relative rounded-[14px] row-1 shrink-0 w-[91px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(0,201,80,0.3)] border-solid inset-0 pointer-events-none rounded-[14px]" />
            <Container5 additionalClassNames="left-[-51px] top-[-5px]">
              <div className="h-[16.805px] relative shrink-0 w-full" data-name="Container">
                <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-[75.03px] not-italic text-[#00a63e] text-[11.2px] text-center top-[0.5px] tracking-[0.0525px]">Total Estribor</p>
              </div>
              <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
                <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[0] left-[73px] not-italic text-[#008236] text-[0px] text-[16px] text-center top-[0.2px] tracking-[-0.1969px]">
                  <span className="leading-[33.6px]">{`435.6 `}</span>
                  <span className="leading-[19.2px] tracking-[-0.06px]">kg</span>
                </p>
              </div>
            </Container5>
          </div>
          <div className="bg-white col-4 content-stretch flex flex-col h-[73px] items-start p-px relative rounded-[14px] row-1 shrink-0 w-[91px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(251,44,54,0.3)] border-solid inset-0 pointer-events-none rounded-[14px]" />
            <div className="absolute h-[71px] left-[-53px] top-[-5px] w-[179px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <div className="absolute h-[16.805px] left-[24px] top-[16px] w-[131px]" data-name="Container">
                  <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-[75.13px] not-italic text-[#e7000b] text-[11.2px] text-center top-[0.5px] tracking-[0.0525px]">Total Babor</p>
                </div>
                <div className="absolute h-[33px] left-[24px] top-[37px] w-[152px]" data-name="Paragraph">
                  <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold h-[34px] leading-[0] left-[75.5px] not-italic text-[#c10007] text-[0px] text-[16px] text-center top-0 tracking-[-0.1969px] w-[85px] whitespace-pre-wrap">
                    <span className="leading-[33.6px]">{`450.5 `}</span>
                    <span className="leading-[19.2px] tracking-[-0.06px]">kg</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[480px] relative shrink-0 w-[396px]" data-name="Container">
          <div className="absolute bg-[rgba(0,201,80,0.15)] border border-[rgba(0,201,80,0.3)] border-solid h-[22px] left-[60px] overflow-clip rounded-[8px] top-[2.5px] w-[63.641px]" data-name="Text">
            <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[31px] not-italic text-[#008236] text-[12px] text-center top-[3px]">Estribor</p>
          </div>
          <div className="absolute content-stretch flex h-[28.5px] items-center justify-center left-[178px] pr-[0.008px] top-0 w-[40px]" data-name="Container">
            <Wrapper5 additionalClassNames="h-[15.594px] w-[31.758px]">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15.6px] left-[16px] not-italic text-[#717182] text-[10.4px] text-center top-[-0.5px] tracking-[0.0975px]">Dif. kg</p>
            </Wrapper5>
          </div>
          <div className="absolute bg-[rgba(251,44,54,0.15)] border border-[rgba(251,44,54,0.3)] border-solid h-[22px] left-[279px] overflow-clip rounded-[8px] top-[2.5px] w-[52.32px]" data-name="Text">
            <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[25.5px] not-italic text-[#c10007] text-[12px] text-center top-[3px]">Babor</p>
          </div>
          <div className="absolute bg-[rgba(0,201,80,0.08)] content-stretch flex flex-col h-[54px] items-start left-0 pb-px pt-[9px] px-[9px] rounded-[10px] top-[34.1px] w-[183px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(0,201,80,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <ParagraphText text="Orkatz" />
            <div className="h-[16.805px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.8px] left-[82.98px] not-italic text-[#008236] text-[11.2px] text-center top-[0.41px] tracking-[0.0525px]">69.8 kg</p>
            </div>
          </div>
          <div className="absolute content-stretch flex h-[54px] items-center justify-center left-[179px] top-[34.5px] w-[40px]" data-name="Container">
            <Container6 additionalClassNames="w-[15.984px]">
              <Container />
              <TextText1 text="0.7" additionalClassNames="w-[15.984px]" />
            </Container6>
          </div>
          <div className="absolute bg-[rgba(251,44,54,0.08)] content-stretch flex flex-col h-[54px] items-start left-[213px] pb-px pt-[9px] px-[9px] rounded-[10px] top-[34.1px] w-[183px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(251,44,54,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="h-[19.195px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[83.05px] not-italic text-[#0a0a0a] text-[12.8px] text-center top-[-0.09px] tracking-[-0.06px]">Adur</p>
            </div>
            <ParagraphText1 text="70.5 kg" />
          </div>
          <div className="absolute bg-[rgba(0,201,80,0.08)] content-stretch flex flex-col h-[54px] items-start left-0 pb-px pt-[9px] px-[9px] rounded-[10px] top-[94.1px] w-[183px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(0,201,80,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="h-[19.195px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[83.38px] not-italic text-[#0a0a0a] text-[12.8px] text-center top-[-0.09px] tracking-[-0.06px]">Maka</p>
            </div>
            <div className="h-[16.805px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.8px] left-[83.04px] not-italic text-[#008236] text-[11.2px] text-center top-[0.41px] tracking-[0.0525px]">76.2 kg</p>
            </div>
          </div>
          <div className="absolute content-stretch flex h-[54px] items-center justify-center left-[179px] top-[94.5px] w-[40px]" data-name="Container">
            <Container6 additionalClassNames="w-[15.125px]">
              <Container1 />
              <TextText1 text="1.3" additionalClassNames="w-[15.125px]" />
            </Container6>
          </div>
          <div className="absolute bg-[rgba(251,44,54,0.08)] content-stretch flex flex-col h-[54px] items-start left-[213px] pb-px pt-[9px] px-[9px] rounded-[10px] top-[94.1px] w-[183px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(251,44,54,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="h-[19.195px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[82.61px] not-italic text-[#0a0a0a] text-[12.8px] text-center top-[-0.09px] tracking-[-0.06px]">Larre</p>
            </div>
            <ParagraphText2 text="74.9 kg" additionalClassNames="h-[16.805px]" />
          </div>
          <div className="absolute bg-[rgba(0,201,80,0.08)] content-stretch flex flex-col h-[54px] items-start left-0 pb-px pt-[9px] px-[9px] rounded-[10px] top-[154.1px] w-[183px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(0,201,80,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="h-[19.195px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[83.07px] not-italic text-[#0a0a0a] text-[12.8px] text-center top-[-0.09px] tracking-[-0.06px]">Etxabe</p>
            </div>
            <div className="h-[16.805px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.8px] left-[83.02px] not-italic text-[#008236] text-[11.2px] text-center top-[0.41px] tracking-[0.0525px]">73.9 kg</p>
            </div>
          </div>
          <div className="absolute content-stretch flex h-[54px] items-center justify-center left-[179px] top-[154.5px] w-[40px]" data-name="Container">
            <Container6 additionalClassNames="w-[14px]">
              <Container />
              <TextText1 text="1.1" additionalClassNames="w-[13.328px]" />
            </Container6>
          </div>
          <div className="absolute bg-[rgba(251,44,54,0.08)] content-stretch flex flex-col h-[54px] items-start left-[213px] pb-px pt-[9px] px-[9px] rounded-[10px] top-[154.1px] w-[183px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(251,44,54,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="h-[19.195px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[83.76px] not-italic text-[#0a0a0a] text-[12.8px] text-center top-[-0.09px] tracking-[-0.06px]">Lander</p>
            </div>
            <ParagraphText1 text="75 kg" />
          </div>
          <div className="absolute bg-[rgba(0,201,80,0.08)] content-stretch flex flex-col h-[54px] items-start left-0 pb-px pt-[9px] px-[9px] rounded-[10px] top-[214.1px] w-[183px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(0,201,80,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <ParagraphText text="Karti" />
            <div className="h-[16.805px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.8px] left-[83.21px] not-italic text-[#008236] text-[11.2px] text-center top-[0.41px] tracking-[0.0525px]">74 kg</p>
            </div>
          </div>
          <div className="absolute content-stretch flex h-[54px] items-center justify-center left-[178px] top-[214.5px] w-[40px]" data-name="Container">
            <Container6 additionalClassNames="w-[22.047px]">
              <Container2 />
              <TextText2 text="10.8" additionalClassNames="w-[22.047px]" />
            </Container6>
          </div>
          <div className="absolute bg-[rgba(251,44,54,0.08)] content-stretch flex flex-col h-[54px] items-start left-[213px] pb-px pt-[9px] px-[9px] rounded-[10px] top-[214.1px] w-[183px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(251,44,54,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="h-[19.195px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[83.32px] not-italic text-[#0a0a0a] text-[12.8px] text-center top-[-0.09px] tracking-[-0.06px]">Arbona</p>
            </div>
            <div className="h-[16.805px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.8px] left-[83.84px] not-italic text-[#c10007] text-[11.2px] text-center top-[0.41px] tracking-[0.0525px]">84.8 kg</p>
            </div>
          </div>
          <div className="absolute bg-[rgba(0,201,80,0.08)] content-stretch flex flex-col h-[54px] items-start left-0 pb-px pt-[9px] px-[9px] rounded-[10px] top-[274.1px] w-[183px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(0,201,80,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="h-[19.195px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[82.95px] not-italic text-[#0a0a0a] text-[12.8px] text-center top-[-0.09px] tracking-[-0.06px]">Markel</p>
            </div>
            <div className="h-[16.805px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.8px] left-[82.91px] not-italic text-[#008236] text-[11.2px] text-center top-[0.41px] tracking-[0.0525px]">73.4 kg</p>
            </div>
          </div>
          <div className="absolute content-stretch flex h-[54px] items-center justify-center left-[178px] top-[274.5px] w-[40px]" data-name="Container">
            <Container6 additionalClassNames="w-[14.891px]">
              <Container1 />
              <TextText1 text="0.1" additionalClassNames="w-[14.891px]" />
            </Container6>
          </div>
          <div className="absolute bg-[rgba(251,44,54,0.08)] content-stretch flex flex-col h-[54px] items-start left-[213px] pb-px pt-[9px] px-[9px] rounded-[10px] top-[274.1px] w-[183px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(251,44,54,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="h-[19.195px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[83px] not-italic text-[#0a0a0a] text-[12.8px] text-center top-[-0.09px] tracking-[-0.06px]">Krixpin</p>
            </div>
            <div className="h-[16.805px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.8px] left-[83.03px] not-italic text-[#c10007] text-[11.2px] text-center top-[0.41px] tracking-[0.0525px]">73.3 kg</p>
            </div>
          </div>
          <div className="absolute bg-[rgba(0,201,80,0.08)] content-stretch flex flex-col h-[54px] items-start left-0 pb-px pt-[9px] px-[9px] rounded-[10px] top-[334.1px] w-[183px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(0,201,80,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="h-[19.195px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[83.27px] not-italic text-[#0a0a0a] text-[12.8px] text-center top-[-0.09px] tracking-[-0.06px]">Amos</p>
            </div>
            <div className="h-[16.805px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.8px] left-[83.97px] not-italic text-[#008236] text-[11.2px] text-center top-[0.41px] tracking-[0.0525px]">68.3 kg</p>
            </div>
          </div>
          <div className="absolute content-stretch flex h-[54px] items-center justify-center left-[178px] pr-[0.008px] top-[334.5px] w-[40px]" data-name="Container">
            <Container6 additionalClassNames="w-[15.961px]">
              <Container2 />
              <TextText2 text="3.7" additionalClassNames="w-[15.961px]" />
            </Container6>
          </div>
          <div className="absolute bg-[rgba(251,44,54,0.08)] content-stretch flex flex-col h-[54px] items-start left-[213px] pb-px pt-[9px] px-[9px] rounded-[10px] top-[334.1px] w-[183px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[rgba(251,44,54,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="h-[19.195px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[83.06px] not-italic text-[#0a0a0a] text-[12.8px] text-center top-[-0.09px] tracking-[-0.06px]">Escribano</p>
            </div>
            <ParagraphText2 text="72 kg" additionalClassNames="h-[18px]" />
          </div>
          <div className="absolute bg-[rgba(251,44,54,0.08)] border border-[rgba(251,44,54,0.2)] border-solid h-[70px] left-[213px] rounded-[10px] top-[394.1px] w-[183px]" data-name="Container">
            <div className="absolute h-[19.195px] left-[-76.02px] top-[7.91px] w-[334px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.2px] left-[166.84px] not-italic text-[#0a0a0a] text-[12.8px] text-center top-0 tracking-[-0.06px]">Arregui</p>
            </div>
            <div className="absolute h-[16.805px] left-[-76.02px] top-[27.11px] w-[334px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.8px] left-[166.91px] not-italic text-[#c10007] text-[11.2px] text-center top-[0.5px] tracking-[0.0525px]">72.1 kg</p>
            </div>
            <div className="absolute h-[13.195px] left-[-76.02px] top-[45.91px] w-[334px]" data-name="Paragraph">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.2px] left-[166.92px] not-italic text-[#717182] text-[8.8px] text-center top-0 tracking-[0.1759px]">Proel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}