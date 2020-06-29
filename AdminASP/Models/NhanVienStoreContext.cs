using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class NhanVienStoreContext : BaseStoreContext
    {

        public override BaseModel ConvertReaderToModelFind(MySqlDataReader reader)
        {
            BaseModel model = new NhanVien()
            {
                IdNhanVien = Convert.ToInt32(reader["ID_NHAN_VIEN"].ToString()),
                Ten = reader["TEN"].ToString(),
                Sdt = reader["SDT"].ToString(),
                Loai = Convert.ToInt32(reader["LOAI"].ToString()),
                Username = reader["USERNAME"].ToString()
            };

            return model;
        }

        public override BaseModel ConvertReaderToModelGetAll(MySqlDataReader reader)
        {
            BaseModel model = new NhanVien()
            {
                IdNhanVien = Convert.ToInt32(reader["ID_NHAN_VIEN"].ToString()),
                Ten = reader["TEN"].ToString(),
                Sdt = reader["SDT"].ToString(),
                Loai = Convert.ToInt32(reader["LOAI"].ToString()),
                Username = reader["USERNAME"].ToString()
            };

            return model;
        }

        public override MySqlCommand CreateQueryAdd(MySqlConnection conn, BaseModel model)
        {
            NhanVien currentModel = (NhanVien)model;
            String query = "INSERT INTO nhan_vien (ID_NHAN_VIEN,TEN,SDT,LOAI,USERNAME) VALUES (@ID_NHAN_VIEN,@TEN,@SDT,@LOAI,@USERNAME)";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_NHAN_VIEN", currentModel.IdNhanVien);
            mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);
            mySqlCommand.Parameters.AddWithValue("SDT", currentModel.Sdt);
            mySqlCommand.Parameters.AddWithValue("LOAI", currentModel.Loai);
            mySqlCommand.Parameters.AddWithValue("USERNAME", currentModel.Username);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model)
        {
            NhanVien currentModel = (NhanVien)model;
            String query = "DELETE FROM nhan_vien WHERE  nhan_vien.ID_NHAN_VIEN = @ID_NHAN_VIEN ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_NHAN_VIEN", currentModel.IdNhanVien);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDeleteAll(MySqlConnection conn)
        {
            String query = "DELETE FROM nhan_vien";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel)
        {
            NhanVien oldcurrentModel = (NhanVien)oldmodel;
            NhanVien newcurrentModel = (NhanVien)newmodel;
            String query = "UPDATE nhan_vien SET ID_NHAN_VIEN = @ID_NHAN_VIEN,TEN = @TEN,SDT = @SDT,LOAI = @LOAI,USERNAME = @USERNAME WHERE  nhan_vien.ID_NHAN_VIEN = @OLD_ID_NHAN_VIEN ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_NHAN_VIEN", newcurrentModel.IdNhanVien);
            mySqlCommand.Parameters.AddWithValue("TEN", newcurrentModel.Ten);
            mySqlCommand.Parameters.AddWithValue("SDT", newcurrentModel.Sdt);
            mySqlCommand.Parameters.AddWithValue("LOAI", newcurrentModel.Loai);
            mySqlCommand.Parameters.AddWithValue("USERNAME", newcurrentModel.Username);
            mySqlCommand.Parameters.AddWithValue("OLD_ID_NHAN_VIEN", oldcurrentModel.IdNhanVien);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryFind(MySqlConnection conn, BaseModel model)
        {
            NhanVien currentModel = (NhanVien)model;

            String query = "SELECT * FROM nhan_vien WHERE 1=1 ";
            if (currentModel.IdNhanVien >= 0) query += " AND nhan_vien.ID_NHAN_VIEN = @ID_NHAN_VIEN ";
            if (currentModel.Ten != null) query += " AND nhan_vien.TEN = @TEN ";
            if (currentModel.Sdt != null) query += " AND nhan_vien.SDT = @SDT ";
            if (currentModel.Loai >= 0) query += " AND nhan_vien.LOAI = @LOAI ";
            if (currentModel.Username != null) query += " AND nhan_vien.USERNAME = @USERNAME ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            if (currentModel.IdNhanVien >= 0) mySqlCommand.Parameters.AddWithValue("ID_NHAN_VIEN", currentModel.IdNhanVien);
            if (currentModel.Ten != null) mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);
            if (currentModel.Sdt != null) mySqlCommand.Parameters.AddWithValue("SDT", currentModel.Sdt);
            if (currentModel.Loai >= 0) mySqlCommand.Parameters.AddWithValue("LOAI", currentModel.Loai);
            if (currentModel.Username != null) mySqlCommand.Parameters.AddWithValue("USERNAME", currentModel.Username);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryGetAll(MySqlConnection conn)
        {
            String query = "SELECT * FROM nhan_vien";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

    }
}

