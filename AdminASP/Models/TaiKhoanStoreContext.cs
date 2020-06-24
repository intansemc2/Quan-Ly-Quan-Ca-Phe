using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class TaiKhoanStoreContext : BaseStoreContext
    {
        public static string ComputeSha256Hash(string rawData)
        {
            // Create a SHA256   
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

                // Convert byte array to a string   
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public override BaseModel ConvertReaderToModelFind(MySqlDataReader reader)
        {
            BaseModel model = new TaiKhoan()
            {
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
                Username = reader["USERNAME"].ToString(),
                Password = reader["PASSWORD"].ToString(),
                Type = Convert.ToInt32(reader["TYPE"].ToString())
            };

            return model;
        }

        public override MySqlCommand CreateQueryAdd(MySqlConnection conn, BaseModel model)
        {
            TaiKhoan currentModel = (TaiKhoan)model;
            String query = "INSERT INTO tai_khoan (USERNAME,PASSWORD,TYPE) VALUES (@USERNAME,@PASSWORD,@TYPE)";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("USERNAME", currentModel.Username);
            mySqlCommand.Parameters.AddWithValue("PASSWORD", currentModel.Password);
            mySqlCommand.Parameters.AddWithValue("TYPE", currentModel.Type);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model)
        {
            TaiKhoan currentModel = (TaiKhoan)model;
            String query = "DELETE FROM tai_khoan WHERE  BAN.USERNAME = @USERNAME ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("USERNAME", currentModel.Username);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel)
        {
            TaiKhoan oldcurrentModel = (TaiKhoan)oldmodel;
            TaiKhoan newcurrentModel = (TaiKhoan)newmodel;
            String query = "UPDATE tai_khoan SET @USERNAME,@PASSWORD,@TYPE WHERE  BAN.USERNAME = @OLD_USERNAME ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("USERNAME", newcurrentModel.Username);
            mySqlCommand.Parameters.AddWithValue("PASSWORD", newcurrentModel.Password);
            mySqlCommand.Parameters.AddWithValue("TYPE", newcurrentModel.Type);
            mySqlCommand.Parameters.AddWithValue("OLD_USERNAME", oldcurrentModel.Username);

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
    }
}

