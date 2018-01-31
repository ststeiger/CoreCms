
namespace CoreCMS.AppCode
{
    
    
    public class NginxLogParser
    {
        
        
        // NginxLogParser.ParseLine((@"63.143.42.248 - - [13/Nov/2017:17:23:16 +0100] ""HEAD / HTTP/1.1"" 200 0 ""http://www.daniel-steiger.ch"" ""Mozilla/5.0+(compatible; UptimeRobot/2.0; http://www.uptimerobot.com/)""");
        public static void ParseLine(string line)
        {
            // https://coderwall.com/p/snn1ag/regex-to-parse-your-default-nginx-access-logs
            // http://regexstorm.net/tester
            string pattern = @"(?<ipaddress>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+-\s+-\s+\[(?<dateandtime>\d{2}\/[A-z]{3}\/\d{4}:\d{2}:\d{2}:\d{2}\s+(\+|\-)\d{4})\]\s+\""(?<method>GET|POST|HEAD|PUT|DELETE|OPTIONS|CONNECT|TRACE|PATCH)\s+(?<url>.+?)HTTP\/(?<http>\d\.\d)\""\s+(?<statuscode>\d{3})\s+(?<bytessent>\d+)\s+\""(?<refferer>.+?)\""\s+\""(?<useragent>.+?)\""";
            
            // line = @"63.143.42.248 - - [13/Nov/2017:17:23:16 +0100] ""HEAD / HTTP/1.1"" 200 0 ""http://www.daniel-steiger.ch"" ""Mozilla/5.0+(compatible; UptimeRobot/2.0; http://www.uptimerobot.com/)""";
            
            System.Text.RegularExpressions.Match ma = System.Text.RegularExpressions.Regex.Match(line, pattern);
            if (ma.Success)
            {
                // ... Get group by name.
                string result = ma.Groups["ipaddress"].Value + System.Environment.NewLine;
                result += ma.Groups["dateandtime"].Value + System.Environment.NewLine;
                result += ma.Groups["url"].Value + System.Environment.NewLine;
                result += ma.Groups["method"].Value + System.Environment.NewLine;
                result += ma.Groups["http"].Value + System.Environment.NewLine;
                result += ma.Groups["statuscode"].Value + System.Environment.NewLine;
                result += ma.Groups["bytessent"].Value + System.Environment.NewLine;
                result += ma.Groups["refferer"].Value + System.Environment.NewLine;
                result += ma.Groups["useragent"].Value + System.Environment.NewLine;
                System.Console.WriteLine("Result: {0}", result);


                // 06/Nov/2017:08:52:19 +0100
                string whenString = ma.Groups["dateandtime"].Value;
                System.DateTime when;
                // whenString = "/Noav/2017:17:23:16 +0100"; 
                // System.FormatException: String was not recognized as a valid DateTime.

                if (System.DateTime.TryParseExact(whenString, "dd/MMM/yyyy:HH:mm:ss zzz", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.AssumeLocal, out when))
                {
                    System.Console.WriteLine(when);
                } // End if (System.DateTime.TryParseExact(whenString, "dd/MMM/yyyy:HH:mm:ss zzz", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.AssumeLocal, out when))

            } // End if (ma.Success) 

        } // End Sub ParseNginxLog 
        
        
    }
}