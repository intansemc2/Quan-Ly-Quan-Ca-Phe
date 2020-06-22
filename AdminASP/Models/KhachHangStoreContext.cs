﻿using MySql.Data.MySqlClient;
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
                Username = reader["USERNAME"].ToString(),
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
                Username = reader["USERNAME"].ToString(),
                DiemTichLuy = Convert.ToInt32(reader["DIEM_TICH_LUY"].ToString())
            };

            return model;
        }

        public override MySqlCommand CreateQueryAdd(MySqlConnection conn, BaseModel model)
        {
            KhachHang currentModel = (KhachHang)model;
            String query = "INSERT INTO KHACH_HANG (ID_KHACH_HANG,TEN,SDT,USERNAME,DIEM_TICH_LUY) VALUES (@ID_KHACH_HANG,@TEN,@SDT,@USERNAME,@DIEM_TICH_LUY)";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_KHACH_HANG", currentModel.IdKhachHang);
            mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);
            mySqlCommand.Parameters.AddWithValue("SDT", currentModel.Sdt);
            mySqlCommand.Parameters.AddWithValue("USERNAME", currentModel.Username);
            mySqlCommand.Parameters.AddWithValue("DIEM_TICH_LUY", currentModel.DiemTichLuy);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model)
        {
            KhachHang currentModel = (KhachHang)model;
            String query = "DELETE FROM KHACH_HANG WHERE  BAN.ID_KHACH_HANG = @ID_KHACH_HANG ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_KHACH_HANG", currentModel.IdKhachHang);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel)
        {
            KhachHang oldcurrentModel = (KhachHang)oldmodel;
            KhachHang newcurrentModel = (KhachHang)newmodel;
            String query = "UPDATE KHACH_HANG SET @ID_KHACH_HANG,@TEN,@SDT,@USERNAME,@DIEM_TICH_LUY WHERE  BAN.ID_KHACH_HANG = @OLD_ID_KHACH_HANG ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_KHACH_HANG", newcurrentModel.IdKhachHang);
            mySqlCommand.Parameters.AddWithValue("TEN", newcurrentModel.Ten);
            mySqlCommand.Parameters.AddWithValue("SDT", newcurrentModel.Sdt);
            mySqlCommand.Parameters.AddWithValue("USERNAME", newcurrentModel.Username);
            mySqlCommand.Parameters.AddWithValue("DIEM_TICH_LUY", newcurrentModel.DiemTichLuy);
            mySqlCommand.Parameters.AddWithValue("OLD_ID_KHACH_HANG", oldcurrentModel.IdKhachHang);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryFind(MySqlConnection conn, BaseModel model)
        {
            KhachHang currentModel = (KhachHang)model;

            String query = "SELECT FROM KHACH_HANG WHERE 1=1 ";
            if (currentModel.IdKhachHang >= 0) query += " AND KHACH_HANG.ID_KHACH_HANG = @ID_KHACH_HANG ";
            if (currentModel.Ten != null) query += " AND KHACH_HANG.TEN = @TEN ";
            if (currentModel.Sdt != null) query += " AND KHACH_HANG.SDT = @SDT ";
            if (currentModel.Username != null) query += " AND KHACH_HANG.USERNAME = @USERNAME ";
            if (currentModel.DiemTichLuy >= 0) query += " AND KHACH_HANG.DIEM_TICH_LUY = @DIEM_TICH_LUY ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            if (currentModel.IdKhachHang >= 0) mySqlCommand.Parameters.AddWithValue("ID_KHACH_HANG", currentModel.IdKhachHang);
            if (currentModel.Ten != null) mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);
            if (currentModel.Sdt != null) mySqlCommand.Parameters.AddWithValue("SDT", currentModel.Sdt);
            if (currentModel.Username != null) mySqlCommand.Parameters.AddWithValue("USERNAME", currentModel.Username);
            if (currentModel.DiemTichLuy >= 0) mySqlCommand.Parameters.AddWithValue("DIEM_TICH_LUY", currentModel.DiemTichLuy);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryGetAll(MySqlConnection conn)
        {
            String query = "SELECT * FROM KHACH_HANG";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

    }
}

