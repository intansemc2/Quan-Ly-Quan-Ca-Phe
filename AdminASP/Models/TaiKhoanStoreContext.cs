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
            String query = "INSERT INTO TAI_KHOAN (USERNAME,PASSWORD,TYPE) VALUES (@USERNAME,@PASSWORD,@TYPE)";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("USERNAME", currentModel.Username);
            mySqlCommand.Parameters.AddWithValue("PASSWORD", currentModel.Password);
            mySqlCommand.Parameters.AddWithValue("TYPE", currentModel.Type);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model)
        {
            TaiKhoan currentModel = (TaiKhoan)model;
            String query = "DELETE FROM TAI_KHOAN WHERE  BAN.USERNAME = @USERNAME ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("USERNAME", currentModel.Username);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel)
        {
            TaiKhoan oldcurrentModel = (TaiKhoan)oldmodel;
            TaiKhoan newcurrentModel = (TaiKhoan)newmodel;
            String query = "UPDATE TAI_KHOAN SET @USERNAME,@PASSWORD,@TYPE WHERE  BAN.USERNAME = @OLD_USERNAME ";

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

            String query = "SELECT FROM TAI_KHOAN WHERE 1=1 ";
            if (currentModel.Username != null) query += " AND TAI_KHOAN.USERNAME = @USERNAME ";
            if (currentModel.Password != null) query += " AND TAI_KHOAN.PASSWORD = @PASSWORD ";
            if (currentModel.Type >= 0) query += " AND TAI_KHOAN.TYPE = @TYPE ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            if (currentModel.Username != null) mySqlCommand.Parameters.AddWithValue("USERNAME", currentModel.Username);
            if (currentModel.Password != null) mySqlCommand.Parameters.AddWithValue("PASSWORD", currentModel.Password);
            if (currentModel.Type >= 0) mySqlCommand.Parameters.AddWithValue("TYPE", currentModel.Type);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryGetAll(MySqlConnection conn)
        {
            String query = "SELECT * FROM TAI_KHOAN";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

    }
}

