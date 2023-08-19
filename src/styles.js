const styles = {
  paddingX: 'sm:px-16 px-6',
  paddingNavbar: 'px-6',
  paddingY: 'sm:py-16 py-6',
  padding: 'sm:px-16 px-6 sm:py-16 py-10',

  heroHeadText:
    'hero-head-text 2xl:text-[100px] xl:text-[90px] lg:text-[80px] md:text-[70px] sm:text-[60px] mobile:text-[50px]  text-[40px]  mt-2 break-words break-normal ',
  heroSubText:
    'hero-sub-text  2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[14px] mobile:text-[14px] text-[16px] break-words break-normal ',

  heroLinkKnob:
    '2xl:w-[36px] 2xl:h-[64px] xl:w-[34px] xl:h-[60px] lg:w-[32px] lg:h-[54px] md:w-[30px] md:h-[50px] sm:w-[28px] sm:h-[46px] mobile:w-[26px] mobile:h-[42px]  rounded-3xl  sm:border-3 mobile:border-2.5 border-4 border-tertiary flex justify-center items-start sm:p-1.5 mobile:p-1 p-2',

  sectionSubText:
    'section-sub-text 2xl:text-[22px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] mobile:text-[12px] uppercase tracking-wider break-words break-normal',

  sectionHeadText:
    'section-head-text  2xl:text-[70px] xl:text-[70px] lg:text-[60px] md:text-[50px] sm:text-[40px] mobile:text-[30px] text-[30px] break-words break-normal',

  sectionP:
    '2xl:text-[22px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] mobile:text-[14px] garet-book mt-4 text-black leading-[30px] 2xl:max-w-full xl:max-w-full lg:max-w-full md:max-w-[750px]',

  tilesHeader:
    '2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] mobile:text-[16px] garet-book  text-black break-words break-normal',

  tilesP:
    '2xl:text-[18px] xl:text-[16px] lg:text-[14px] md:text-[14px] sm:text-[12px] mobile:text-[12px] garet-book mt-4 text-black  leading-[30px]',

  tilesFeedbackName:
    '2xl:text-[18px] xl:text-[16px] lg:text-[14px] md:text-[14px] sm:text-[12px] mobile:text-[12px] garet-book text-content-title  font-medium',
  tilesFeedbackCompany:
    '2xl:text-[18px] xl:text-[16px] lg:text-[14px] md:text-[14px] sm:text-[12px] mobile:text-[12px] great-book m1-1',

  formSpan:
    '2xl:text-[18px] xl:text-[16px] lg:text-[14px] md:text-[14px] sm:text-[12px] mobile:text-[12px] garet-book  font-medium mobile:mb-2 mb-4',
  formInput:
    '2xl:text-[18px] xl:text-[16px] lg:text-[14px] md:text-[14px] sm:text-[12px] mobile:text-[12px] bg-grey-10 py-4 px-6 placeholder:lightblack placeholder:font-garet-book outline-none border-none  font-medium lg:min-w-[400px]',

  menubrandText:
    '2xl:text-[18px] xl:text-[16px] lg:text-[14px] md:text-[14px] sm:text-[14px] mobile:text-[14px] font-garet-heavy cursor-pointer flex',
  menulinkText:
    '2xl:text-[18px] xl:text-[16px] xl:text-[14px] md:text-[14px] garet-book font-medium cursor-pointer',
  menulinkTextHamburger:
    'sm:text-[14px] mobile:text-[14px] garet-book font-medium cursor-pointer ',

  customdropdown:
    ' bg-primary absolute mt-2 z-10  divide-y divide-black dropdown w-22 shadow-dropdown',

  customdropdownBt:
    '2xl:px-4.5 2xl:py-3 xl:px-4 xl:py-2.5 lg:px-3.5 lg:py-2 md:px-3 md:py-1.5 sm:px-3 sm:py-1.5 mobile:px-3 mobile:py-1.5 2xl:text-[16px] xl:text-[14px] lg:text-[14px] md:text-[12px] sm:text-[12px] mobile:text-[12px] bg-black text-white  text-center inline-flex items-center ',

  customdropdownSvg:
    '2xl:w-4 2xl:h-4 2xl:ml-2 xl:w-4 xl:h-4 xl:ml-2 2xl:w-4 2xl:h-4 2xl:ml-2 lg:w-3.5 lg:h-3.5 lg:ml-1.5 md:w-3 md:h-3 md:ml-1 sm:w-3 sm:h-3 sm:ml-1 mobile:w-3 mobile:h-3 mobile:ml-1 ',

  customdropdownImg:
    '2xl:w-[32px] 2xl:h-[32px] xl:w-[28px] xl:h-[28px] md:w-[26px] md:h-[26px] sm:w-[26px] sm:h-[26px] mobile:w-[26px] mobile:h-[26px] ',

  customdropdownList:
    '2xl:text-[16px] xl:text-[14px] lg:text-[14px] md:text-[12px] sm:text-[12px] mobile:text-[12px] py-2 text-black',

  customdropdownListImg:
    '2xl:max-w-[32px] 2xl:max-h-[32px] xl:max-w-[28px] xl:max-h-[28px] md:max-w-[24px] md:max-h-[24px] sm:max-w-[24px] sm:max-h-[24px] mobile:max-w-[24px] mobile:max-h-[24px] 2xl:mr-2 xl:mr-2 lg:mr-1.5 md:mr-1 sm:mr-1 mobile:mr-1',

  projectHigherordercomponent: 'bg-white h-screen w-screen fixed inset-0 z-30',

  projectWrapper:
    'fixed inset-0 z-30 2xl:mt-10 xl:mt-8 mx:auto bg-white flex justify-center items-center h-screen w-screen overflow-y-auto max-w-7xl mx-auto',

  projectContainer:
    'bg-white w-full h-full relative flex flex-col 2xl:p-10 xl:p-8 lg:p-6 md:p-6 sm:p-6 mobile:p-4',

  projectHeader:
    'md:text-[60px] sm:text-[50px] mobile:text-[40px] text-[30px] garet-heavy font-bold mb-2 mobile:mt-5',

  projectSubHeader:
    '2xl:text-[22px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] mobile:text-[12px] garet-book italic mb-14',

  projectHeaderBtn:
    '2xl:text-[18px] xl:text-[16px] lg:text-[14px] md:text-[14px] sm:text-[12px] mobile:text-[12px] garet-book absolute top-4 right-4',

  projectFlex:
    'flex gap-10 2xl:flex-nowrap xl:flex-nowrap md:flex-nowrap sm:flex-wrap mobile:flex-wrap',

  projectSection:
    'w-full md:w-2/4  2xl:mb-8 xl:mb-8 lg:mb-6 md:mb-6 md:mb-6 sm:mb-6 mobile:mb-6',

  projectSectionHeader:
    '2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] mobile:text-[16px] garet-book 2xl:mb-14 xl:mb-12 lg:mb-10 md:mb-8 sm:mb-6 mobile:mb-4 ',

  projectSectionText:
    '2xl:text-[18px] xl:text-[16px] lg:text-[14px] md:text-[14px] sm:text-[12px] mobile:text-[12px] garet-book mb-12',

  projectSectionList:
    'list-disc list-inside 2xl:mb-12 xl:mb-12 lg:mb-12 md:mb-8 sm:mb-6 mobile:mb-4 space-y-4',

  projectSectionListItem:
    '2xl:text-[18px] xl:text-[16px] lg:text-[14px] md:text-[14px] sm:text-[12px] mobile:text-[12px] garet-book',

  projectCoffeecanSectionReactplayer:
    'react-player 2xl:w-full xl:max-w-[600px] lg:max-w-[600px] md:max-w-[500px] sm:max-w-[500px] mobile:max-w-[350px] ',

  projectTopicoSubSection:
    '2xl:flex-row xl:flex-row gap-4 lg:flex-row md:flex-col sm:flex-col mobile:flex-col flex flex-row ',

  projectTopcioDemoImg:
    'mobile:max-w-[400px] sm:max-w-[450px] md:max-w-[400px] lg:max-w-[450px] xl:min-w-[450px ] 2xl:min-w-[450px]',

  projectTopicoSectionReactcplayer:
    'react-player min-w-[220px] max-w-[220px] md:order-last sm:order-last mobile:order-last',

  submitBtn: '   ',
};

export { styles };
