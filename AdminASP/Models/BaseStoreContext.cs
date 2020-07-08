using MySql.Data.MySqlClient;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public abstract class BaseStoreContext
    {
        private String connectionString;
        private MySqlConnection mySqlConnection;

        public String ConnectionString { get { return this.connectionString; } set { this.connectionString = value; } }
        public MySqlConnection MySqlConnection { get { return this.mySqlConnection; } set { this.mySqlConnection = value; } }

        public BaseStoreContext GenerateNewConnection()
        {
            this.mySqlConnection = new MySqlConnection(this.connectionString);
            return this;
        }

        public List<BaseModel> GetAll(MySqlConnection conn = null)
        {
            List<BaseModel> listModels = new List<BaseModel>();

            if (conn == null)
            {
                conn = this.GenerateNewConnection().MySqlConnection;
            }

            conn.Open();
            MySqlCommand cmd = this.CreateQueryGetAll(conn);
            using (MySqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    listModels.Add(this.ConvertReaderToModelGetAll(reader));
                }
                reader.Close();
            }
            conn.Close();

            return listModels;
        }

        public int Add(BaseModel newModel, MySqlConnection conn = null)
        {
            if (conn == null)
            {
                conn = this.GenerateNewConnection().MySqlConnection;
            }

            conn.Open();
            MySqlCommand cmd = this.CreateQueryAdd(conn, newModel);
            return (cmd.ExecuteNonQuery());
        }

        public int Edit(BaseModel oldModel, BaseModel newModel, MySqlConnection conn = null)
        {
            if (conn == null)
            {
                conn = this.GenerateNewConnection().MySqlConnection;
            }

            conn.Open();
            MySqlCommand cmd = this.CreateQueryEdit(conn, oldModel, newModel);
            return (cmd.ExecuteNonQuery());
        }

        public int Delete(BaseModel model, MySqlConnection conn = null)
        {
            if (conn == null)
            {
                conn = this.GenerateNewConnection().MySqlConnection;
            }

            conn.Open();
            MySqlCommand cmd = this.CreateQueryDelete(conn, model);
            return (cmd.ExecuteNonQuery());
        }

        public int DeleteAll(MySqlConnection conn = null)
        {
            if (conn == null)
            {
                conn = this.GenerateNewConnection().MySqlConnection;
            }

            conn.Open();
            MySqlCommand cmd = this.CreateQueryDeleteAll(conn);
            return (cmd.ExecuteNonQuery());
        }

        public List<BaseModel> Find(BaseModel sampleModel, MySqlConnection conn = null)
        {
            List<BaseModel> listModels = new List<BaseModel>();

            if (conn == null)
            {
                conn = this.GenerateNewConnection().MySqlConnection;
            }

            conn.Open();
            MySqlCommand cmd = this.CreateQueryFind(conn, sampleModel);
            using (MySqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    listModels.Add(this.ConvertReaderToModelFind(reader));
                }
                reader.Close();
            }
            conn.Close();

            return listModels;
        }

        public abstract MySqlCommand CreateQueryGetAll(MySqlConnection conn);
        public abstract MySqlCommand CreateQueryAdd(MySqlConnection conn, BaseModel model);
        public abstract MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel);
        public abstract MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model);
        public abstract MySqlCommand CreateQueryDeleteAll(MySqlConnection conn);
        public abstract MySqlCommand CreateQueryFind(MySqlConnection conn, BaseModel model);

        public abstract BaseModel ConvertReaderToModelGetAll(MySqlDataReader reader);
        public abstract BaseModel ConvertReaderToModelFind(MySqlDataReader reader);
    }
}
