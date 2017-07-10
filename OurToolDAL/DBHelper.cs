using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Linq;


namespace mfg_word_Dal
{
    public class DBHelper
    {
        //数据库连接字符串(web.config来配置)，可以动态更改connectionString支持多数据库.		
        public static string connectionString = ConfigurationManager.ConnectionStrings["ourConn"].ConnectionString;

        #region 工厂模式的连接数据库
        #region 全局变量
        protected static DbCommand DbCommand;
        protected static DbTransaction DbTransaction;
        protected static DbProviderFactory DbProviderFactory;
        protected static DbConnection DbConnection;
        protected DbDataAdapter DbaAdapter;
        #endregion
        private static void InitFactory()
        {
            using (DbConnection)
            {



                if (DbConnection == null || DbTransaction == null)
                {
                    DbProviderFactory = DbProviderFactories.GetFactory(new MySqlConnection());
                    DbConnection = DbProviderFactory.CreateConnection();
                    DbConnection.ConnectionString = connectionString;
                }

            }


        }
        #endregion

        #region 原生
        /// <summary>
        /// 执行SQL语句，返回影响的记录数，没有传入事务
        /// </summary>
        /// <param name="SQLString">SQL语句</param>
        /// <returns>影响的记录数</returns>
        public static int ExecuteSql(string SQLString, params MySqlParameter[] cmdParms)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand())
                {
                    try
                    {
                        PrepareCommand(cmd, connection, null, SQLString, cmdParms);
                        int rows = cmd.ExecuteNonQuery();
                        cmd.Parameters.Clear();
                        return rows;
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private static void PrepareCommand(MySqlCommand cmd, MySqlConnection conn, MySqlTransaction trans, string cmdText, MySqlParameter[] cmdParms)
        {
            if (conn.State != ConnectionState.Open)
                conn.Open();
            cmd.Connection = conn;
            cmd.CommandText = cmdText;
            if (trans != null)
                cmd.Transaction = trans;
            cmd.CommandType = CommandType.Text;//cmdType;
            if (cmdParms != null)
            {
                foreach (MySqlParameter parameter in cmdParms)
                {
                    if ((parameter.Direction == ParameterDirection.InputOutput || parameter.Direction == ParameterDirection.Input) &&
                        (parameter.Value == null))
                    {
                        parameter.Value = DBNull.Value;
                    }
                    cmd.Parameters.Add(parameter);
                }
            }
        }


        /// <summary>
        /// 执行多条SQL语句，实现数据库事务。
        /// </summary>
        /// <param name="SQLStringList">多条SQL语句</param>		
        public static int ExecuteSqlTran(List<String> SQLStringList)
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                MySqlTransaction tx = conn.BeginTransaction();
                cmd.Transaction = tx;
                try
                {
                    int count = 0;
                    for (int n = 0; n < SQLStringList.Count; n++)
                    {
                        string strsql = SQLStringList[n];
                        if (strsql.Trim().Length > 1)
                        {
                            cmd.CommandText = strsql;
                            count += cmd.ExecuteNonQuery();
                        }
                    }
                    tx.Commit();
                    return count;
                }
                catch
                {
                    tx.Rollback();
                    return 0;
                }
            }
        }



        /// <summary>
        /// 执行多条SQL语句，实现数据库事务。
        /// </summary>
        /// <param name="SQLStringList">多条SQL语句</param>
        /// <param name="SqlParameterList">多条SQL参数</param>
        /// <returns></returns>
        public static int ExecuteSqlTran(List<String> SQLStringList, List<MySqlParameter[]> SqlParameterList)
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand();
                MySqlTransaction tx = conn.BeginTransaction();
                int ac = 0;
                try
                {
                    int count = 0;
                    for (int n = 0; n < SQLStringList.Count; n++)
                    {
                        string strsql = SQLStringList[n];
                        if (strsql.Trim().Length > 1)
                        {
                            MySqlParameter[] arr = null;
                            if (SqlParameterList.Count > n)
                            {
                                arr = SqlParameterList[n];
                            }
                            PrepareCommand(cmd, conn, tx, strsql, arr);
                            count += cmd.ExecuteNonQuery();
                            ac++;
                        }
                    }
                    tx.Commit();
                    return count;
                }
                catch (Exception ex)
                {
                    var a = ac;
                    var b = SQLStringList[ac];
                    var c = SqlParameterList[ac];

                    tx.Rollback();
                    throw ex;
                    //return 0;
                }
            }
        }


        #region ExecuteScalar
        public static object ExecuteScalar(string sql, MySqlParameter[] paras)
        {
            object obj;
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand())
                {
                    try
                    {
                        PrepareCommand(cmd, connection, null, sql, paras);
                        obj = cmd.ExecuteScalar();
                        cmd.Parameters.Clear();

                    }
                    catch
                    {

                        return 0;
                    }
                }
            }
            return obj;
        }
        #endregion

        /// <summary>
        /// 执行查询语句，返回MySqlDataReader ( 注意：调用该方法后，一定要对MySqlDataReader进行Close )
        /// </summary>
        /// <param name="strSQL">查询语句</param>
        /// <returns>MySqlDataReader</returns>
        public static MySqlDataReader ExecuteReader(string strSQL)
        {
            MySqlConnection connection = new MySqlConnection(connectionString);
            MySqlCommand cmd = new MySqlCommand(strSQL, connection);
            try
            {
                connection.Open();
                MySqlDataReader myReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                return myReader;
            }
            catch (MySql.Data.MySqlClient.MySqlException e)
            {
                throw e;
            }

        }
        #endregion

        #region 扩展

        /// <summary>
        /// 执行一条计算查询结果语句，返回查询结果（object）。
        /// </summary>
        /// <param name="SQLString">计算查询结果语句</param>
        /// <returns>查询结果（object）</returns>
        public static object GetSingle(string SQLString)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand(SQLString, connection))
                {
                    try
                    {
                        connection.Open();
                        object obj = cmd.ExecuteScalar();
                        if ((Object.Equals(obj, null)) || (Object.Equals(obj, System.DBNull.Value)))
                        {
                            return null;
                        }
                        else
                        {
                            return obj;
                        }
                    }
                    catch (MySql.Data.MySqlClient.MySqlException e)
                    {
                        connection.Close();
                        throw e;
                    }
                }
            }
        }

        #region 事物的方法
        /// <summary>
        /// 开始一个ado.net 的事务
        /// </summary>
        public static void BeginTrancation()
        {
            InitFactory();
            if (DbConnection.State != ConnectionState.Open)
                DbConnection.Open();
            DbTransaction = DbConnection.BeginTransaction();


        }
        /// <summary>
        /// 提交一个事务
        /// </summary>
        public static void Commit()
        {
            DbTransaction.Commit();
        }
        /// <summary>
        /// 回滚一个事务
        /// </summary>
        public static void Rollback()
        {
            if (DbTransaction == null)
            {
                return;
            }
            DbTransaction.Rollback();
            DbTransaction.Dispose();
        }

        #region 执行完事务进行释放连接
        public static void Dispose()
        {
            DbConnection?.Dispose();
            DbCommand?.Dispose();
            DbTransaction?.Dispose();
        }

        #endregion
        #endregion

        #region 获取单条记录
        /// <summary>
        /// 获取单条记录Scalar
        /// </summary>
        /// <param name="sqlStr"></param>
        /// <param name="dbParameters"></param>
        /// <returns></returns>
        public static object GetScalarFile(string sqlStr, params IDataParameter[] dbParameters)
        {
            if (DbTransaction != null)
            {
                object queryObject = null;
                SetDbCommandOpen(sqlStr, CommandType.Text, dbParameters);
                try
                {
                    queryObject = DbCommand.ExecuteScalar();

                }
                catch (DbException dbException)
                {
                    string msg = dbException.Message;

                }
                return queryObject;
            }
            else
            {
                using (DbConnection)
                {
                    object queryObject = null;
                    SetDbCommandOpen(sqlStr, CommandType.Text, dbParameters);
                    try
                    {
                        queryObject = DbCommand.ExecuteScalar();

                    }
                    catch (DbException dbException)
                    {
                        string msg = dbException.Message;

                    }
                    return queryObject;

                }

            }
        }
        #endregion
        #region SetCommand、Adapter

        /// <summary>
        /// 设置dbcommand
        /// </summary>
        /// <param name="sqlStr"></param>
        /// <param name="commandType"></param>
        /// <param name="dbParameters"></param>
        private static void SetDbCommandOpen(string sqlStr, CommandType commandType, params IDataParameter[] dbParameters)
        {
            InitFactory();


            using (DbCommand)
            {
                
           
                #region 释放资源的命令在调用方法中执行
                DbCommand = DbProviderFactory.CreateCommand();
                if (DbCommand != null)
                {
                    DbCommand.Connection = DbConnection;
                    DbCommand.CommandText = sqlStr;
                    DbCommand.CommandType = commandType;
                    DbCommand.CommandTimeout = 30;
                    if (dbParameters.Length > 0)
                    {
                        foreach (var item in dbParameters)
                        {
                            DbCommand.Parameters.Add(item);
                        }
                    }
                }
                if (DbConnection.State == ConnectionState.Open) return;
                try
                {
                    DbConnection.Open();
                }
                catch (DbException dbException)
                {
                    throw dbException;
                }

                #endregion

            }

        }

        #region 执行SQL语句
        /// <summary>
        /// 执行单条的sql 语句,事务必须用这个
        /// </summary>
        /// <param name="sqlStr"></param>
        /// <param name="dbParameters"></param>
        /// <returns></returns>
        public static int ExecSql(string sqlStr, params IDataParameter[] dbParameters)
        {
            if (DbTransaction != null)
            {
                int execSqlRes = -1;
                SetDbCommandOpen(sqlStr, CommandType.Text, dbParameters);
                try
                {
                    execSqlRes = DbCommand.ExecuteNonQuery();


                }
                catch (DbException dbException)
                {
                    throw dbException;
                }
                return execSqlRes;

            }
            else
            {
                using (DbConnection)
                {
                    int execSqlRes = -1;
                    SetDbCommandOpen(sqlStr, CommandType.Text, dbParameters);
                    try
                    {
                        execSqlRes = DbCommand.ExecuteNonQuery();


                    }
                    catch (DbException dbException)
                    {
                        throw dbException;
                    }
                    return execSqlRes;
                }
            }

        }
        #endregion
        #endregion
        /// <summary>
        /// 获取单个实体
        /// </summary>
        /// <param name="sqlStr"></param>
        /// <param name="func"></param>
        /// <param name="dbParameters"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public static T GetDataInfo<T>(string sqlStr, Func<IDataReader, T> func, params IDataParameter[] dbParameters)
        {
            var list = GetDataInfolList(sqlStr, func, dbParameters);
            var t = default(T);
            if (list != null && list.Any())
            {
                t = list.First();
            }
            return t;
        }

        /// <summary>
        /// 获取实体list
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sqlStr"></param>
        /// <param name="func"></param>
        /// <param name="dbParameters"></param>
        /// <returns></returns>
        public static List<T> GetDataInfolList<T>(string sqlStr, Func<IDataReader, T> func, params IDataParameter[] dbParameters)
        {
            if (DbTransaction != null)
            {
                DbDataReader reader = GetDataReader(sqlStr, dbParameters);
                var list = new List<T>();
                using (reader)
                {
                    while (reader.Read())
                    {
                        list.Add(func(reader));
                    }
                }
                return list;

            }
            else
            {
              

                    DbDataReader reader = GetDataReader(sqlStr, dbParameters);
                    var list = new List<T>();
                    using (reader)
                    {
                        while (reader.Read())
                        {
                            list.Add(func(reader));
                        }
                    }
                    return list;
              

            }


        }

        private static DbDataReader GetDataReader(string sqlStr, params IDataParameter[] dbParameters)
        {
            DbDataReader reader = null;

            SetDbCommandOpen(sqlStr, CommandType.Text, dbParameters);
            try
            {
                reader = DbCommand.ExecuteReader(CommandBehavior.CloseConnection);
               

            }
            catch (DbException dbException)
            {

                throw dbException;

            }
            return reader;




        }



        public static DbParameter AddParameterWithValue(string parameterName, object value)
        {
            DbParameter dbParameter = GetDbParameter();
            if (dbParameter == null) return null;

            dbParameter.ParameterName = parameterName;
            dbParameter.Value = value;
            dbParameter.Direction = ParameterDirection.Input;

            return dbParameter;

        }

        protected static DbParameter GetDbParameter()
        {
            return new MySqlParameter();
        }
        #endregion


        public static int ExecuteStatement(String statement, List<MySqlParameter> parameters, CommandType commandtext = CommandType.Text)
        {
            int results = 0;
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                var command = new MySqlCommand(statement, connection);
                command.CommandType = commandtext;
                if (parameters != null)
                    foreach (var p in parameters)
                        command.Parameters.Add(p);
                results = command.ExecuteNonQuery();
                command.Parameters.Clear();
            }
            return results;
        }

        /// <summary>
        /// 返回数据集合
        /// </summary>
        /// <typeparam name="T">实体</typeparam>
        /// <param name="statement">SQL</param>
        /// <param name="readFunc">FUN</param>
        /// <param name="parameters">参数</param>
        /// <param name="commandtext">执行类型</param>
        /// <returns></returns>
        public static List<T> ExecuteStatements<T>(String statement, Func<MySqlDataReader, T> readFunc, List<MySqlParameter> parameters, CommandType commandtext = CommandType.Text)
        {
            List<T> results = new List<T>();
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                var command = new MySqlCommand(statement, connection);
                command.CommandType = commandtext;
                if (parameters != null)
                    foreach (var p in parameters)
                        command.Parameters.Add(p);
                using (var reader = command.ExecuteReader())
                {
                    if (reader.HasRows)
                        while (reader.Read())
                            results.Add(readFunc(reader));
                }
            }
            return results;
        }

        public static T ExecuteStatement<T>(String statement, Func<MySqlDataReader, T> readFunc, List<MySqlParameter> parameters, CommandType commandtext = CommandType.Text)
        {
            T results = default(T);
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                var command = new MySqlCommand(statement, connection);
                command.CommandType = commandtext;
                if (parameters != null)
                    foreach (var p in parameters)
                        command.Parameters.Add(p);
                using (var reader = command.ExecuteReader())
                {
                    results = readFunc(reader);
                }
            }
            return results;
        }


        public static void ExecuteStatementList(String statement, Action<MySqlDataReader> readFunc, List<MySqlParameter> parameters, CommandType commandtext = CommandType.Text)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    var command = new MySqlCommand(statement, connection);
                    command.CommandType = commandtext;
                    if (parameters != null)
                        foreach (var p in parameters)
                            command.Parameters.Add(p);
                    using (var reader = command.ExecuteReader())
                    {
                        readFunc(reader);
                    }
                }
                catch
                {

                    throw;
                }

            }
        }
    }
}
