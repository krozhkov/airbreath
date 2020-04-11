using System;
using System.Security.Cryptography;

namespace AirBreath.Server.Common
{
    public static class Utils
    {
        public static string GenerateApiKey()
        {
            // https://stackoverflow.com/questions/14412132/best-approach-for-generating-api-key
            var key = new byte[32];
            using (var generator = RandomNumberGenerator.Create())
            {
                generator.GetBytes(key);
                return Convert.ToBase64String(key);
            }
        }
    }
}
