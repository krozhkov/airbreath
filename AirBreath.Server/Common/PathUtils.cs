using System;
using System.IO;
using System.Linq;

namespace AirBreath.Server.Common
{
    internal static class PathUtils
    {
        public static string GetContentRootPath()
        {
            if (UnitTestDetector.IsInUnitTest)
            {
                return GetSolutionRelativeContentRoot();
            }

            string applicationBasePath = AppContext.BaseDirectory;
            if (applicationBasePath.Contains("bin"))
            {
                applicationBasePath = applicationBasePath.Substring(0, applicationBasePath.LastIndexOf("bin"));
            }
            return applicationBasePath;
        }

        public static string GetSolutionRelativeContentRoot()
        {
            string applicationBasePath = AppContext.BaseDirectory;
            string solutionRelativePath = typeof(PathUtils).Assembly.GetName().Name;
            string solutionName = "*.sln";

            var directoryInfo = new DirectoryInfo(applicationBasePath);
            do
            {
                var solutionPath = Directory.EnumerateFiles(directoryInfo.FullName, solutionName).FirstOrDefault();
                if (solutionPath != null)
                {
                    return Path.GetFullPath(Path.Combine(directoryInfo.FullName, solutionRelativePath));
                }

                directoryInfo = directoryInfo.Parent;
            }
            while (directoryInfo.Parent != null);

            throw new InvalidOperationException($"Solution root could not be located using application root {applicationBasePath}.");
        }
    }
}
