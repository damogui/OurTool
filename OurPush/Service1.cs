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
using OurToolCommon;

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

            System.Threading.Timer timer2 = new System.Threading.Timer(DoPush, null, 0, 1000 * 30);//6秒执行一次
        }


        /// <summary>
        /// 进行推送
        /// </summary>
        private void DoPush(object state)
        {
            try
            {

                int dth = Convert.ToInt32(DateTime.Now.ToString("HH"));
                if (dth>9&&dth<18&& isP == 0)
                {
                    PushCommon  pushCommon=new PushCommon();
                    flagPush = 1;
                    int execNum = 1; //_studentManageBll.GetPushStuWatch();//进行监督推送

                    List<string> openIds = new List<string>() { "o6rQe0aKEzmBTecAaPCjRK_Kc5z4" };//我自己 ozmxY0rJ3qWyq8QWzXE-6GBRXUzo
                    string tempId = "q_B2s9FepOU4pMBXQKPLgTsoDO9P6dQD7dxzq6VWGhw";//获取机构的退课模板

                    int numExec = 0;
                    StringBuilder sb = new StringBuilder();
                    foreach (var item in openIds)
                    {
                        sb.Append("{\"touser\": \"" + item + "\"," +
                                   "\"template_id\": \"" + tempId + "\", " +
                                      "\"page\": \"" + "pages/index/index" + "\", " +

                                   "\"form_id\": \"" + "4869e640a35dd5de019f8f6d99a8c00e" + "\", " +
                                   "\"data\": " +
                                   "{\"keyword1\": {\"value\": \"" + DateTime.Now.ToString("yyyy-MM-dd HH:mm") + "\",\"color\": \"#173177\"}," +
                                   //"\"keyword1\": { \"value\": \"《" + "书名"+ "》\",\"color\": \"#173177\"}," +
                                   "\"keyword2\": { \"value\": \"" + "888888" + "\",\"color\": \"#173177\"}," +
                                         "\"keyword3\": { \"value\": \"" + "已经受理" + "\",\"color\": \"#173177\"}," +

                                   "\"keyword4\": {\"value\": \"" + "请期待" + "\",\"color\": \"#173177\" }}}");
                        pushCommon.SendTempletMessge(sb.ToString(), "wxba92380dc6210082", "8938f3c2513bfc3883038284b67e0316");

                        numExec += 1;
                        sb.Clear();


                    }

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
