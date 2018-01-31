
-- DECLARE @PL_UID varchar(36) 
-- SET @PL_UID = '5F4CF1B6-7612-4C16-B51E-8DFD619A68E4' 

SET @BE_ID = COALESCE
			( 
				 NULLIF(@BE_ID, 0) 
				,(SELECT T_Benutzer.BE_ID FROM T_Benutzer WHERE T_Benutzer.BE_User = 'admin' AND T_Benutzer.BE_Status = 1 ) 
				,(SELECT T_Benutzer.BE_ID FROM T_Benutzer WHERE T_Benutzer.BE_User = 'administrator' AND T_Benutzer.BE_Status = 1 ) 
			); 

DELETE FROM T_VWS_PdfLegende 
WHERE T_VWS_PdfLegende.PL_UID = @PL_UID
