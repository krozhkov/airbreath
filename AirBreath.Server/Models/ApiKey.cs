using System;

namespace AirBreath.Server.Models
{
    public class ApiKey
    {
        public int Id { get; set; }

        public string Owner { get; set; }

        public string Key { get; set; }

        public DateTime Created { get; set; }
    }
}
