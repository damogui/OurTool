using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace OurPush
{
    public partial class Service1 : ServiceBase
    {

        private int flagPush = 0;//是否已经推送0今天未推送，1已经推送
        //StudentManageBll _studentManageBll = new StudentManageBll();
        int isP = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["isPush"]);
        public Service1()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {

            System.Threading.Timer timer2 = new System.Threading.Timer(DoPush, null, 0, 1000 * 6);//6秒执行一次
        }


        /// <summary>
        /// 进行推送
        /// </summary>
        private void DoPush(object state)
        {
            try
            {
                if (DateTime.Now.ToString("HH:mm") == "07:30" && flagPush == 0 && isP == 0)
                {
                    flagPush = 1;
                    int execNum = 1; //_studentManageBll.GetPushStuWatch();//进行监督推送

                }
                if (DateTime.Now.ToString("HH:mm") == "23:30")
                {
                    flagPush = 0;//恢复原值
                }

            }
            catch (Exception)
            {


            }
        }


        protected override void OnStop()
        {
        }


   



    }
}
