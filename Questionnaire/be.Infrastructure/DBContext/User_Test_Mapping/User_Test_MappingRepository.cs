﻿
using be.Services;

namespace Infrastructure
{
    public class User_Test_MappingRepository : IUser_Test_MappingRepository
    {
        private SettingDbcontext _dbcontext;
        public User_Test_MappingRepository(SettingDbcontext dbcontext)
        {
            _dbcontext = dbcontext;
        }

    }
}
