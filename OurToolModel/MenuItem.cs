using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OurToolModel
{

    /// <summary>
    /// 菜单项
    /// </summary>
    public enum MenuItem
    {
        /// <summary>
        /// 首页
        /// </summary>
        Home,

        /// <summary>
        /// MFG管理---机构管理
        /// </summary>
        OrgPage,

        /// <summary>
        /// MFG管理---课程管理
        /// </summary>
        CoursePage,

        /// <summary>
        /// MFG管理---渠道管理
        /// </summary>
        ChannelPage,

        /// <summary>
        /// MFG管理---个人中心
        /// </summary>
        UserPage,

        /// <summary>
        /// 机构管理---人员管理
        /// </summary>
        OrgPeoplePage,

        /// <summary>
        /// 机构管理---统计
        /// </summary>
        OrgStatisticPage,

        /// <summary>
        /// 机构管理---学生管理
        /// </summary>
        OrgStudentPage,

        /// <summary>
        /// 机构管理---班级管理
        /// </summary>
        OrgClassPage,

        /// <summary>
        /// 机构管理---校区管理
        /// </summary>
        OrgSchoolPage,

        /// <summary>
        /// 机构管理---课程管理
        /// </summary>
        OrgCoursePage,

        /// <summary>
        /// 机构管理---学币管理
        /// </summary>
        OrgCurrencyPage,

        /// <summary>
        /// 机构管理---绩效管理
        /// </summary>
        OrgKPIPage,

        /// <summary>
        /// 机构管理---个人中心
        /// </summary>
        OrgUserPage,

        /// <summary>
        /// 老师端---班级管理
        /// </summary>
        TeacherMyClassPage,

        /// <summary>
        /// 老师端---测评中心
        /// </summary>
        TeacherTestPage,

        /// <summary>
        /// 老师端---个人中心
        /// </summary>
        TeacherPage,

        /// <summary>
        /// 学生端---学习中心
        /// </summary>
        StudentLearnPage,

        /// <summary>
        /// 学生端--测评中心
        /// </summary>
        StudentTestPage,

        /// <summary>
        /// 学生端--学币商城
        /// </summary>
        StudentSuperMarket,

        /// <summary>
        /// 学生端---个人中心
        /// </summary>
        StudentPage,

        /// <summary>
        /// 家长端---首页
        /// </summary>
        ParentHomePage

    }

    /// <summary>
    /// 菜单的扩展属性
    /// </summary>
    public enum ShowType
    {
        /// <summary>
        /// 学币
        /// </summary>
        Currency,
        /// <summary>
        /// 正在上课
        /// </summary>
        Working,
        /// <summary>
        /// 什么都不显示
        /// </summary>
        Nothing
    }

    public enum ReturnState
    {
        /// <summary>
        /// 成功
        /// </summary>

        Success,
        /// <summary>
        /// 参数错误
        /// </summary>
        ParmError,
        /// <summary>
        /// 系统错误
        /// </summary>
        SystemError,
        /// <summary>
        /// 其他错误
        /// </summary>
        OtherError
    }

    /// <summary>
    /// 页面
    /// </summary>
    public class MenuPage
    {
        /// <summary>
        /// 路径URL
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// 是否页面
        /// </summary>
        public string isPage { get; set; }


    }
}
