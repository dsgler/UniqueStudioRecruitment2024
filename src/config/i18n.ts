import { DEPARTMENTS, DEPARTMENTS_EN, GENDERS, GENDERS_EN, GRADE, GRADE_EN, NecessaryInfoTitle, NecessaryInfoTitleEn, Period, PeriodEn, ProcessState, ProcessStateEN, RANK, RANK_EN, RecruitmentName, RecruitmentNameEn, Step, StepEn, TIMELINE, TIMELINE_EN } from "./const";

export const i18nConstants = {
  "en-US": {
    header: {
      team: "Unique Studio",
      applications: "Applications",
      info: "Resume",
      avatar: "Change avatar",
      logout: "Log out",
      language: "language",
      getInfoFailed: "get info failed"
    },
    history: {
      records: "Application Records",
      viewDetails: "View Details",
      noRecord: "No application record yet",
      step: StepEn,
      processState: ProcessStateEN,
      timeLine: TIMELINE_EN,
      recruitmentName: RecruitmentNameEn,
      period: PeriodEn,
      currentProcess: "current process",
      notApplyTips: "Unique Studio is looking forward to your joining",
      outTips: "Looking forward to meeting a better you",
      passTips: "Congratulations on joining Unique Studio",
      passSubTips: "For other information, please contact the group leader",
      passTipsSummerCamp: "Welcome to Unique Studio Summer Camp",
      overTips: "Recruitment has ended",
      notSelected: "Not selected",
      signUpTips: {
        changeInfo: "here",
        notSignInTips:
          "Please fill in basic information, intended group, resume, etc. for registration to help us get to know you better. Click {changeInfo} to fill in",
        SignInTips:
          "You have successfully registered for the {recruitment} {group} group. You can modify your personal information at any time before the registration ends. Click {changeInfo} to modify personal information",
      },
      writeTest: {
        writtenTest: "written test/questionnaire",
        loading: "Trying to get test/questionnaire...",
        tips: "Each group will design a written test/questionnaire based on the situation of the group. This is a necessary step for Unique Studio to recruit new members.",
        viewLink: "View the latest {writtenTest}",
        downloadError: "get written questionnaire failed or no questionnaire yet",
        uploadSuccess: "upload success",
        uploadError: "upload failed"
      },
      timeSelector: {
        chooseSuccess: "Selection succeed",
        chooseFailed: "Selection failed",
        noTime: "There are currently no times to choose from",
      },
      groupInterviewTimeSelector: {
        loading: "Retrieving available times...",
      },
      groupInterview: {
        noTime: "The interview time has not been allocated yet, please wait.",
        tips: "Please attend the {group} group interview at {time} at Room {room}, 8th Floor, Liangsheng Building, Qiming College.",
      },
      stressTest: {
        tips: "Each group will design stress test based on the situation of the group. Please participate in the UniqueStudio {group} group test at {time} in Room {room}, 8th Floor, Liangsheng Building, Qiming College",
      },
      teamInterviewTimeSelector: {
        loading: "Retrieving available times...",
      },
      teamInterview: {
        noTime: "The interview time has not been allocated yet, please wait.",
        tips: "Please attend the Unique Studio team interview at {time} at Room {room}, 8th Floor, Liangsheng Building, Qiming College.",
      },
      mobile: {
        notSignUpTips: "Please fill in basic information, intended group, resume, etc. for sign up to help us get to know you better.",
        signUpTips: "You have successfully registered for the {recruitment} {group} group. You can modify your personal information at any time before the registration ends.",
        known: "I know",
        input: "Fill out",
        change: "Edit ",
        viewLink: "View latest link",
        uploadWrittenTest: "Upload answers",
        selectWrittenTest: "Select answers",
        groupInterviewTips: "Group interviews will be conducted by students from the intended group. Please select a time first.",
        selectTime: "Select Time",
        confirm: "confirm",
        cancel: "cancel",
        teamInterviewTips: "Team interview is the last step to join us. The purpose is to let the team members get to know you better.",

      }
    },
    user: {
      selfInfo: "Personal Information",
      basicInfo: "Basic Information",
      edit: "edit",
      email: "email",
      recommender: "recommender",
      name: "name",
      gender: "gender",
      grade: "grade",
      major: "major",
      college: "college",
      isQuick: "SpeedRun",
      isQuickTips: "After sign up for SpeedRun, the written test process will be skipped, and there is no need to take the test after passing the group interview. If you do not pass the interview, you can continue with the normal process and participate in recruitment.",
      quick: "yes",
      notQuick: "no",
      saveSuccess: "Saved successfully",
      saveFailed: "Save failed",
      signUpSuccess: "Sign up successfully",
      signUpFail: "Sign up failed",
      rank: "rank",
      phone: "phone",
      group: "intention group",
      selfIntro: "self introduction",
      attachment: "Attachments & Resume",
      resume: "resume",
      noResume: "No resume yet",
      resumeTooLarge: "size of resume is too large",
      upload: "Upload Attachment",
      uploadSuccess: "Upload successfully",
      uploadFailed: "Upload failed",
      select: "select file",
      reselect: "reselect",
      save: "save",
      saveTips: "You have signed up for recruitment, and the data will be saved on the server.",
      saveTips1: "You are not currently in the recruitment period or you have not signed up for recruitment, the data will be saved locally (the file will not be saved)",
      cancel: "cancel",
      signUp: "sign up",
      signUpConfirm: "You will sign up for {recruitment}, basic information, resume, and portfolio will be uploaded, please fill them in carefully",
      placeholder: "input text here",
      signUpTips: "you will sign up",
      signUpTips1: "Please confirm that the basic information is filled in correctly and the attachments are uploaded correctly (it can still be modified after sign up)",
      resumePopover: "You can upload resumes, portfolios, etc. If you want to upload multiple files, please compress them into .zip . Maximum size is 20MB",
      checkInfo: "{key} is needed!",
      checkDeprecatedGroups: "Group is not contained in current recruitment",
      necessary: NecessaryInfoTitleEn,
      selector: {
        rank: RANK_EN,
        department: DEPARTMENTS_EN,
        grade: GRADE_EN,
        gender: GENDERS_EN,
        isQuick: ["yes", "no"],
      }
    },
  },
  "zh-CN": {
    header: {
      team: "联创团队",
      applications: "我的申请",
      info: "个人信息",
      avatar: "更换头像",
      logout: "退出登录",
      language: "语言",
      getInfoFailed: "获取信息失败"
    },
    history: {
      records: "申请记录",
      viewDetails: "查看详情",
      noRecord: "暂无申请记录",
      step: Step,
      processState: ProcessState,
      timeLine: TIMELINE,
      recruitmentName: RecruitmentName,
      period: Period,
      currentProcess: "当前流程",
      notApplyTips: "联创团队期待你的加入",
      outTips: "期待与更强大的你相遇",
      passTips: "恭喜你加入了联创团队",
      passTipsSummerCamp: "恭喜你加入了联创夏令营",
      passSubTips: "其他信息请与组长沟通",
      overTips: "招新已结束",
      notSelected: "未选择",
      signUpTips: {
        changeInfo: "个人信息",
        notSignInTips:
          "请填写基础信息、意向组别、简历等用于报名，帮助我们更好地了解你。点击填写{changeInfo}",
        SignInTips:
          "你已经成功报名{recruitment}{group}组，报名结束前你可以随时修改个人信息。点击修改{changeInfo}",
      },
      writeTest: {
        loading: "获取笔试/问卷中...",
        writtenTest: "笔试/问卷链接",
        tips: "各组会根据本组情况，设计笔试/问卷，这是联创团队招新的必经环节。",
        viewLink: "查看最新的{writtenTest}",
        downloadError: "获取笔试/问卷失败或暂无笔试/问卷",
        uploadSuccess: "上传成功",
        uploadError: "上传失败"
      },
      timeSelector: {
        chooseSuccess: "修改成功",
        chooseFailed: "修改失败",
        noTime: "暂无可供选择的时间",
      },
      groupInterviewTimeSelector: {
        loading: "获取可供选择的时间中...",
      },
      groupInterview: {
        noTime: "面试时间暂未分配，请等待...",
        tips: "请于{time}于启明学院亮胜楼八楼{room}房间参加{group}组面试",
      },
      stressTest: {
        tips: "各组会根据本组情况设计熬测，请于{time}于启明学院亮胜楼八楼{room}房间参加{group}组熬测",
      },
      teamInterviewTimeSelector: {
        loading: "获取可供选择的时间中...",
      },
      teamInterview: {
        noTime: "面试时间暂未分配，请等待...",
        tips: "请于{time}于启明学院亮胜楼八楼{room}房间参加联创团队群面",
      },
      mobile: {
        known: "知道了",
        input: "填写",
        change: "修改",
        notSignUpTips: "请填写基础信息、意向组别、简历等用于报名，帮助我们更好地了解你。",
        signUpTips: "你已经成功报名{recruitment}{group}组，报名结束前你可以随时修改个人信息。",
        viewLink: "查看最新笔试/问卷",
        uploadWrittenTest: "上传笔试结果",
        selectWrittenTest: "选择笔试结果",
        groupInterviewTips: "组面由意向组别的同学负责面试，请先选择时间",
        selectTime: "选择时间",
        confirm: "确定",
        cancel: "取消",
        teamInterviewTips: "群面是加入联创团队的最后一步，目的是让团队成员更好的了解你",
      }
    },
    user: {
      selfInfo: "个人信息",
      basicInfo: "基本信息",
      edit: "编辑",
      email: "邮箱",
      recommender: "推荐人",
      saveSuccess: "保存成功",
      saveFailed: "保存失败",
      signUpSuccess: "报名成功",
      signUpFail: "报名失败",
      name: "姓名",
      major: "专业",
      gender: "性别",
      grade: "年级",
      college: "学院",
      isQuick: "是否快通",
      isQuickTips: "报名快速通道后，将跳过笔试流程，通过小组面试后无需进行熬测。若未通过面试，也可以继续进行正常流程参与招新",
      quick: "是",
      notQuick: "否",
      rank: "加权排名",
      phone: "电话",
      group: "意向组别",
      selfIntro: "自我介绍",
      attachment: "附件简历",
      resume: "简历",
      noResume: "暂无简历",
      resumeTooLarge: "简历过大",
      upload: "上传附件",
      select: "选择文件",
      reselect: "重新选择",
      placeholder: "请输入",
      save: "保存",
      saveTips: "您已报名招新，数据将会保存在服务端",
      saveTips1: "当前不在招新时间段或您未报名招新，数据将保存在本地（文件不保存）",
      cancel: "取消",
      signUp: "报名",
      signUpConfirm: "你将报名{recruitment}，基本信息，简历，作品集将会上传，请认真填写",
      signUpTips: "你将报名",
      signUpTips1: "请确认基本信息填写无误，附件上传正确（报名后仍然可以修改）",
      resumePopover: "可以上传简历，作品集等，若要上传多个文件，请自行压缩成.zip。最大大小为20MB",
      checkInfo: "请填写{key}",
      checkDeprecatedGroups: "意向组别不在本次招新范围内，请重新选择",
      necessary: NecessaryInfoTitle,
      selector: {
        rank: RANK,
        department: DEPARTMENTS,
        grade: GRADE,
        gender: GENDERS,
        isQuick: ["是", "否"]
      }
    },
  },
} as const;

export type I18nConstants = typeof i18nConstants
