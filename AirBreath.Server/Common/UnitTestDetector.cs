using System;

namespace AirBreath.Server.Common
{
    // https://stackoverflow.com/questions/3167617/determine-if-code-is-running-as-part-of-a-unit-test
    static class UnitTestDetector
    {
        static UnitTestDetector()
        {
            foreach (var assembly in AppDomain.CurrentDomain.GetAssemblies())
            {
                if (assembly.FullName.ToLowerInvariant().StartsWith("xunit"))
                {
                    IsInUnitTest = true;
                    break;
                }
            }
        }

        public static bool IsInUnitTest { get; }
    }
}
