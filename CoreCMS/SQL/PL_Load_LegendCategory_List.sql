
-- PL_Load_LegendCategory_List.sql

-- DECLARE @DAR_UID varchar(36) 
-- SET @DAR_UID = 'F63073FF-135A-4A35-BF75-1D31AE3A18E5' 
-- -- SELECT * FROM T_VWS_Ref_Darstellung 
-- SET @DAR_UID = NULL 
-- SET @DAR_UID = '00000000-0000-0000-0000-000000000000' 

-- DECLARE @PS_UID varchar(36) 
-- SET @PS_UID = 'EBF30512-9ADE-4214-B5DB-FD79628F376A' 
-- -- SELECT * FROM T_VWS_Ref_PaperSize 

-- DECLARE @in_sprache varchar(3) 
-- SET @in_sprache = 'EN' 



-- DECLARE @BE_ID varchar(50); 
-- SET @BE_ID = '12435';
-- SET @BE_ID = (SELECT T_Benutzer.BE_Hash FROM T_Benutzer WHERE T_Benutzer.BE_User = 'admin' AND T_Benutzer.BE_Status = 1 )
-- SET @BE_ID = (SELECT T_Benutzer.BE_ID FROM T_Benutzer WHERE T_Benutzer.BE_User = 'admin' AND T_Benutzer.BE_Status = 1 )
-- SET @BE_ID = (SELECT T_Benutzer.BE_ID FROM T_Benutzer WHERE T_Benutzer.BE_User = 'administrator' AND T_Benutzer.BE_Status = 1 )

SET @BE_ID = COALESCE
			( 
				 NULLIF(@BE_ID, 0) 
				,(SELECT T_Benutzer.BE_ID FROM T_Benutzer WHERE T_Benutzer.BE_User = 'admin' AND T_Benutzer.BE_Status = 1 ) 
				,(SELECT T_Benutzer.BE_ID FROM T_Benutzer WHERE T_Benutzer.BE_User = 'administrator' AND T_Benutzer.BE_Status = 1 ) 
			); 

SELECT 
	 T_VWS_Ref_PdfLegendenKategorie.PLK_UID AS v 
	--,T_VWS_Ref_PdfLegendenKategorie.PLK_DAR_UID 
	,
	CASE T_Benutzer.BE_Language 
		WHEN 'FR' THEN T_VWS_Ref_PdfLegendenKategorie.PLK_Name_FR 
		WHEN 'IT' THEN T_VWS_Ref_PdfLegendenKategorie.PLK_Name_IT 
		WHEN 'EN' THEN T_VWS_Ref_PdfLegendenKategorie.PLK_Name_EN 
		ELSE T_VWS_Ref_PdfLegendenKategorie.PLK_Name_DE 
	END AS t 
	 
	,T_VWS_Ref_PdfLegendenKategorie.PLK_IsDefault AS s 
FROM T_VWS_Ref_PdfLegendenKategorie 

LEFT JOIN T_Benutzer 
	ON 
	(
		CAST(T_Benutzer.BE_ID AS varchar(50)) = CAST(@BE_ID AS varchar(50)) 
		OR 
		T_Benutzer.BE_Hash = CAST(@BE_ID AS varchar(50)) 
	)
	AND T_Benutzer.BE_Status = 1 

WHERE T_VWS_Ref_PdfLegendenKategorie.PLK_Status = 1 
AND T_VWS_Ref_PdfLegendenKategorie.PLK_PS_UID = NULLIF(@PS_UID, 'null') 
AND 
( 
	@DAR_UID = '00000000-0000-0000-0000-000000000000' 
	OR 
	T_VWS_Ref_PdfLegendenKategorie.PLK_DAR_UID = NULLIF(@DAR_UID, 'null') 
	OR 
	( 
		NULLIF(@DAR_UID, 'null') IS NULL 
		AND 
		T_VWS_Ref_PdfLegendenKategorie.PLK_DAR_UID IS NULL 
	) 
) 
