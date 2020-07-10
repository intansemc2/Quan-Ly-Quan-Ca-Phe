using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class TaiKhoanStoreContext : BaseStoreContext
    {

        public override BaseModel ConvertReaderToModelFind(MySqlDataReader reader)
        {
            BaseModel model = new TaiKhoan()
            {
                IdTaiKhoan = Convert.ToInt32(reader["ID_TAI_KHOAN"].ToString()),
                Username = reader["USERNAME"].ToString(),
                Password = reader["PASSWORD"].ToString(),
                Type = Convert.ToInt32(reader["TYPE"].ToString())
            };

            return model;
        }

        public override BaseModel ConvertReaderToModelGetAll(MySqlDataReader reader)
        {
            BaseModel model = new TaiKhoan()
            {
                IdTaiKhoan =Convert.ToInt32(reader["ID_TAI_KHOAN"].ToString()),
                Username = reader["USERNAME"].ToString(),
                Password = reader["PASSWORD"].ToString(),
                Type = Convert.ToInt32(reader["TYPE"].ToString())
            };

            return model;
        }

        public override MySqlCommand CreateQueryAdd(MySqlConnection conn, BaseModel model)
        {
            TaiKhoan currentModel = (TaiKhoan)model;
            String query = "INSERT INTO tai_khoan (ID_TAI_KHOAN,USERNAME,PASSWORD,TYPE) VALUES (@ID_TAI_KHOAN,@USERNAME,@PASSWORD,@TYPE)";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_TAI_KHOAN", currentModel.IdTaiKhoan);
            mySqlCommand.Parameters.AddWithValue("USERNAME", currentModel.Username);
            mySqlCommand.Parameters.AddWithValue("PASSWORD", currentModel.Password);
            mySqlCommand.Parameters.AddWithValue("TYPE", currentModel.Type);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model)
        {
            TaiKhoan currentModel = (TaiKhoan)model;
            String query = "DELETE FROM tai_khoan WHERE  tai_khoan.ID_TAI_KHOAN = @ID_TAI_KHOAN ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_TAI_KHOAN", currentModel.IdTaiKhoan);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel)
        {
            TaiKhoan oldcurrentModel = (TaiKhoan)oldmodel;
            TaiKhoan newcurrentModel = (TaiKhoan)newmodel;
            String query = "UPDATE tai_khoan SET USERNAME = @USERNAME,PASSWORD = @PASSWORD,TYPE = @TYPE WHERE  tai_khoan.ID_TAI_KHOAN = @ID_TAI_KHOAN ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("USERNAME", newcurrentModel.Username);
            mySqlCommand.Parameters.AddWithValue("PASSWORD", newcurrentModel.Password);
            mySqlCommand.Parameters.AddWithValue("TYPE", newcurrentModel.Type);
            mySqlCommand.Parameters.AddWithValue("ID_TAI_KHOAN", oldcurrentModel.IdTaiKhoan);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryFind(MySqlConnection conn, BaseModel model)
        {
            TaiKhoan currentModel = (TaiKhoan)model;

            String query = "SELECT * FROM tai_khoan WHERE 1=1 ";
            if (currentModel.Username != null) query += " AND tai_khoan.USERNAME = @USERNAME ";
            if (currentModel.Password != null) query += " AND tai_khoan.PASSWORD = @PASSWORD ";
            if (currentModel.Type >= 0) query += " AND tai_khoan.TYPE = @TYPE ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            if (currentModel.Username != null) mySqlCommand.Parameters.AddWithValue("USERNAME", currentModel.Username);
            if (currentModel.Password != null) mySqlCommand.Parameters.AddWithValue("PASSWORD", currentModel.Password);
            if (currentModel.Type >= 0) mySqlCommand.Parameters.AddWithValue("TYPE", currentModel.Type);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryGetAll(MySqlConnection conn)
        {
            String query = "SELECT * FROM tai_khoan";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

        public bool CheckLogin(TaiKhoan model, bool isPasswordHashed = true, MySqlConnection conn = null)
        {
            if (conn == null)
            {
                conn = this.GenerateNewConnection().MySqlConnection;
            }

            if (model == null)
            {
                return false;
            }

            conn.Open();

            int numberAccountsMatch = 0;

            String query = "SELECT COUNT(tai_khoan.ID_TAI_KHOAN) AS 'NUMBER_ACCOUNTS'  FROM tai_khoan WHERE USERNAME = @USERNAME AND PASSWORD = @PASSWORD";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("USERNAME", model.Username);
            mySqlCommand.Parameters.AddWithValue("PASSWORD", model.Password);

            using (MySqlDataReader reader = mySqlCommand.ExecuteReader())
            {
                if (reader.Read())
                {
                    numberAccountsMatch = Convert.ToInt32(reader["NUMBER_ACCOUNTS"].ToString());
                }
                reader.Close();
            }
            conn.Close();

            return numberAccountsMatch > 0;
        }

        public override MySqlCommand CreateQueryDeleteAll(MySqlConnection conn)
        {
            String query = "DELETE FROM tai_khoan";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }
    }
}

