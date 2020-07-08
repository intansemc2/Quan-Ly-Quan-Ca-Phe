using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class DatBanStoreContext : BaseStoreContext
    {

        public override BaseModel ConvertReaderToModelFind(MySqlDataReader reader)
        {
            BaseModel model = new DatBan()
            {
                Username = reader["USERNAME"].ToString(),
                IdBan = Convert.ToInt32(reader["ID_BAN"].ToString()),
                ThoiGIanLap = reader["THOI_GIAN_LAP"].ToString(),
                ThoiGIanNhan = reader["THOI_GIAN_NHAN"].ToString(),
                GhiChu = reader["GHI_CHU"].ToString(),
                IdHoaDon = reader["ID_HOA_DON"].ToString()
            };

            return model;
        }

        public override BaseModel ConvertReaderToModelGetAll(MySqlDataReader reader)
        {
            BaseModel model = new DatBan()
            {
                Username = reader["USERNAME"].ToString(),
                IdBan = Convert.ToInt32(reader["ID_BAN"].ToString()),
                ThoiGIanLap = reader["THOI_GIAN_LAP"].ToString(),
                ThoiGIanNhan = reader["THOI_GIAN_NHAN"].ToString(),
                GhiChu = reader["GHI_CHU"].ToString(),
                IdHoaDon = reader["ID_HOA_DON"].ToString()
            };

            return model;
        }

        public override MySqlCommand CreateQueryAdd(MySqlConnection conn, BaseModel model)
        {
            DatBan currentModel = (DatBan)model;
            String query = "INSERT INTO dat_ban (USERNAME,ID_BAN,THOI_GIAN_LAP,THOI_GIAN_NHAN,GHI_CHU,ID_HOA_DON) VALUES (@USERNAME,@ID_BAN,@THOI_GIAN_LAP,@THOI_GIAN_NHAN,@GHI_CHU,@ID_HOA_DON)";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("USERNAME", currentModel.Username);
            mySqlCommand.Parameters.AddWithValue("ID_BAN", currentModel.IdBan);
            mySqlCommand.Parameters.AddWithValue("THOI_GIAN_LAP", currentModel.ThoiGIanLap);
            mySqlCommand.Parameters.AddWithValue("THOI_GIAN_NHAN", currentModel.ThoiGIanNhan);
            mySqlCommand.Parameters.AddWithValue("GHI_CHU", currentModel.GhiChu);
            mySqlCommand.Parameters.AddWithValue("ID_HOA_DON", currentModel.IdHoaDon);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model)
        {
            DatBan currentModel = (DatBan)model;
            String query = "DELETE FROM dat_ban WHERE  dat_ban.USERNAME = @USERNAME  AND  dat_ban.ID_BAN = @ID_BAN  AND  dat_ban.THOI_GIAN_LAP = @THOI_GIAN_LAP ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("USERNAME", currentModel.Username);
            mySqlCommand.Parameters.AddWithValue("ID_BAN", currentModel.IdBan);
            mySqlCommand.Parameters.AddWithValue("THOI_GIAN_LAP", currentModel.ThoiGIanLap);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDeleteAll(MySqlConnection conn)
        {
            String query = "DELETE FROM dat_ban";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel)
        {
            DatBan oldcurrentModel = (DatBan)oldmodel;
            DatBan newcurrentModel = (DatBan)newmodel;
            String query = "UPDATE dat_ban SET USERNAME = @USERNAME,ID_BAN = @ID_BAN,THOI_GIAN_LAP = @THOI_GIAN_LAP,THOI_GIAN_NHAN = @THOI_GIAN_NHAN,GHI_CHU = @GHI_CHU,ID_HOA_DON = @ID_HOA_DON WHERE  dat_ban.USERNAME = @OLD_USERNAME  AND  dat_ban.ID_BAN = @OLD_ID_BAN  AND  dat_ban.THOI_GIAN_LAP = @OLD_THOI_GIAN_LAP ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("USERNAME", newcurrentModel.Username);
            mySqlCommand.Parameters.AddWithValue("ID_BAN", newcurrentModel.IdBan);
            mySqlCommand.Parameters.AddWithValue("THOI_GIAN_LAP", newcurrentModel.ThoiGIanLap);
            mySqlCommand.Parameters.AddWithValue("THOI_GIAN_NHAN", newcurrentModel.ThoiGIanNhan);
            mySqlCommand.Parameters.AddWithValue("GHI_CHU", newcurrentModel.GhiChu);
            mySqlCommand.Parameters.AddWithValue("ID_HOA_DON", newcurrentModel.IdHoaDon);
            mySqlCommand.Parameters.AddWithValue("OLD_USERNAME", oldcurrentModel.Username);
            mySqlCommand.Parameters.AddWithValue("OLD_ID_BAN", oldcurrentModel.IdBan);
            mySqlCommand.Parameters.AddWithValue("OLD_THOI_GIAN_LAP", oldcurrentModel.ThoiGIanLap);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryFind(MySqlConnection conn, BaseModel model)
        {
            DatBan currentModel = (DatBan)model;

            String query = "SELECT * FROM dat_ban WHERE 1=1 ";
            if (currentModel.Username != null) query += " AND dat_ban.USERNAME = @USERNAME ";
            if (currentModel.IdBan >= 0) query += " AND dat_ban.ID_BAN = @ID_BAN ";
            if (currentModel.ThoiGIanLap != null) query += " AND dat_ban.THOI_GIAN_LAP = @THOI_GIAN_LAP ";
            if (currentModel.ThoiGIanNhan != null) query += " AND dat_ban.THOI_GIAN_NHAN = @THOI_GIAN_NHAN ";
            if (currentModel.GhiChu != null) query += " AND dat_ban.GHI_CHU = @GHI_CHU ";
            if (currentModel.IdHoaDon != null) query += " AND dat_ban.ID_HOA_DON = @ID_HOA_DON ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            if (currentModel.Username != null) mySqlCommand.Parameters.AddWithValue("USERNAME", currentModel.Username);
            if (currentModel.IdBan >= 0) mySqlCommand.Parameters.AddWithValue("ID_BAN", currentModel.IdBan);
            if (currentModel.ThoiGIanLap != null) mySqlCommand.Parameters.AddWithValue("THOI_GIAN_LAP", currentModel.ThoiGIanLap);
            if (currentModel.ThoiGIanNhan != null) mySqlCommand.Parameters.AddWithValue("THOI_GIAN_NHAN", currentModel.ThoiGIanNhan);
            if (currentModel.GhiChu != null) mySqlCommand.Parameters.AddWithValue("GHI_CHU", currentModel.GhiChu);
            if (currentModel.IdHoaDon != null) mySqlCommand.Parameters.AddWithValue("ID_HOA_DON", currentModel.IdHoaDon);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryGetAll(MySqlConnection conn)
        {
            String query = "SELECT * FROM dat_ban";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

    }
}

