using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class KhachHangStoreContext : BaseStoreContext
    {

        public override BaseModel ConvertReaderToModelFind(MySqlDataReader reader)
        {
            BaseModel model = new KhachHang()
            {
                IdKhachHang = Convert.ToInt32(reader["ID_KHACH_HANG"].ToString()),
                Ten = reader["TEN"].ToString(),
                Sdt = reader["SDT"].ToString(),
                IdTaiKhoan = Convert.ToInt32(reader["ID_TAI_KHOAN"].ToString()),
                DiemTichLuy = Convert.ToInt32(reader["DIEM_TICH_LUY"].ToString())
            };

            return model;
        }

        public override BaseModel ConvertReaderToModelGetAll(MySqlDataReader reader)
        {
            BaseModel model = new KhachHang()
            {
                IdKhachHang = Convert.ToInt32(reader["ID_KHACH_HANG"].ToString()),
                Ten = reader["TEN"].ToString(),
                Sdt = reader["SDT"].ToString(),
                IdTaiKhoan = Convert.ToInt32(reader["ID_TAI_KHOAN"].ToString()),
                DiemTichLuy = Convert.ToInt32(reader["DIEM_TICH_LUY"].ToString())
            };

            return model;
        }

        public override MySqlCommand CreateQueryAdd(MySqlConnection conn, BaseModel model)
        {
            KhachHang currentModel = (KhachHang)model;
            String query = "INSERT INTO khach_hang (ID_KHACH_HANG,TEN,SDT,ID_TAI_KHOAN,DIEM_TICH_LUY) VALUES (@ID_KHACH_HANG,@TEN,@SDT,@ID_TAI_KHOAN,@DIEM_TICH_LUY)";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_KHACH_HANG", currentModel.IdKhachHang);
            mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);
            mySqlCommand.Parameters.AddWithValue("SDT", currentModel.Sdt);
            mySqlCommand.Parameters.AddWithValue("ID_TAI_KHOAN", currentModel.IdTaiKhoan);
            mySqlCommand.Parameters.AddWithValue("DIEM_TICH_LUY", currentModel.DiemTichLuy);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model)
        {
            KhachHang currentModel = (KhachHang)model;
            String query = "DELETE FROM khach_hang WHERE  khach_hang.ID_KHACH_HANG = @ID_KHACH_HANG ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_KHACH_HANG", currentModel.IdKhachHang);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDeleteAll(MySqlConnection conn)
        {
            String query = "DELETE FROM khach_hang";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel)
        {
            KhachHang oldcurrentModel = (KhachHang)oldmodel;
            KhachHang newcurrentModel = (KhachHang)newmodel;
            String query = "UPDATE khach_hang SET ID_KHACH_HANG = @ID_KHACH_HANG,TEN = @TEN,SDT = @SDT,ID_TAI_KHOAN = @ID_TAI_KHOAN,DIEM_TICH_LUY = @DIEM_TICH_LUY WHERE  khach_hang.ID_KHACH_HANG = @OLD_ID_KHACH_HANG ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_KHACH_HANG", newcurrentModel.IdKhachHang);
            mySqlCommand.Parameters.AddWithValue("TEN", newcurrentModel.Ten);
            mySqlCommand.Parameters.AddWithValue("SDT", newcurrentModel.Sdt);
            mySqlCommand.Parameters.AddWithValue("ID_TAI_KHOAN", newcurrentModel.IdTaiKhoan);
            mySqlCommand.Parameters.AddWithValue("DIEM_TICH_LUY", newcurrentModel.DiemTichLuy);
            mySqlCommand.Parameters.AddWithValue("OLD_ID_KHACH_HANG", oldcurrentModel.IdKhachHang);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryFind(MySqlConnection conn, BaseModel model)
        {
            KhachHang currentModel = (KhachHang)model;

            String query = "SELECT * FROM khach_hang WHERE 1=1 ";
            if (currentModel.IdKhachHang >= 0) query += " AND khach_hang.ID_KHACH_HANG = @ID_KHACH_HANG ";
            if (currentModel.Ten != null) query += " AND khach_hang.TEN = @TEN ";
            if (currentModel.Sdt != null) query += " AND khach_hang.SDT = @SDT ";
            if (currentModel.IdTaiKhoan >= 0) query += " AND khach_hang.ID_TAI_KHOAN = @ID_TAI_KHOAN ";
            if (currentModel.DiemTichLuy >= 0) query += " AND khach_hang.DIEM_TICH_LUY = @DIEM_TICH_LUY ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            if (currentModel.IdKhachHang >= 0) mySqlCommand.Parameters.AddWithValue("ID_KHACH_HANG", currentModel.IdKhachHang);
            if (currentModel.Ten != null) mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);
            if (currentModel.Sdt != null) mySqlCommand.Parameters.AddWithValue("SDT", currentModel.Sdt);
            if (currentModel.IdTaiKhoan >= 0) mySqlCommand.Parameters.AddWithValue("ID_TAI_KHOAN", currentModel.IdTaiKhoan);
            if (currentModel.DiemTichLuy >= 0) mySqlCommand.Parameters.AddWithValue("DIEM_TICH_LUY", currentModel.DiemTichLuy);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryGetAll(MySqlConnection conn)
        {
            String query = "SELECT * FROM khach_hang";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

    }
}

