
-- DELETE with whitelist.sql 


-- DECLARE @PL_PLK_UID varchar(36) 
-- SET @PL_PLK_UID = '5F4CF1B6-7612-4C16-B51E-8DFD619A68E4' 

-- DECLARE @in_sprache varchar(3) 
-- SET @in_sprache = 'DE' 


SET @BE_ID = COALESCE
			( 
				 NULLIF(@BE_ID, 0) 
				,(SELECT T_Benutzer.BE_ID FROM T_Benutzer WHERE T_Benutzer.BE_User = 'admin' AND T_Benutzer.BE_Status = 1 ) 
				,(SELECT T_Benutzer.BE_ID FROM T_Benutzer WHERE T_Benutzer.BE_User = 'administrator' AND T_Benutzer.BE_Status = 1 ) 
			); 


SELECT 
	 T_VWS_Ref_PaperSize.PS_Width_mm
	,T_VWS_Ref_PaperSize.PS_Height_mm
	 
	,T_VWS_PdfLegende.PL_UID
	,T_VWS_PdfLegende.PL_PLK_UID
	,T_VWS_PdfLegende.PL_Type
	,T_VWS_PdfLegende.PL_Format

	,T_VWS_PdfLegende.PL_X
	,T_VWS_PdfLegende.PL_Y
	,T_VWS_PdfLegende.PL_W
	,T_VWS_PdfLegende.PL_H

	,T_VWS_PdfLegende.PL_Angle
	,T_VWS_PdfLegende.PL_AspectRatio
	,T_VWS_PdfLegende.PL_AlignH
	,T_VWS_PdfLegende.PL_AlignV
	 
	,
	CASE T_Benutzer.BE_Language
		WHEN 'FR' THEN T_VWS_PdfLegende.PL_Text_FR
		WHEN 'IT' THEN T_VWS_PdfLegende.PL_Text_IT
		WHEN 'EN' THEN T_VWS_PdfLegende.PL_Text_EN
		ELSE T_VWS_PdfLegende.PL_Text_DE
	END AS PL_Text 
	
	,T_VWS_PdfLegende.PL_Outline
	,T_VWS_PdfLegende.PL_Style
	,T_VWS_PdfLegende.PL_DataBind

	,
	CASE 
		WHEN T_VWS_PdfLegende.PL_Type = 'rectangle' THEN 1 
		WHEN T_VWS_PdfLegende.PL_Type = 'legend' THEN 2 
		WHEN T_VWS_PdfLegende.PL_Type = 'image' THEN 3 
		WHEN T_VWS_PdfLegende.PL_Type = 'text' THEN 4 
		ELSE NULL
	END AS RPT_TypeSort 

	,100 + ROW_NUMBER() OVER 
    (
         ORDER BY 
		 ISNULL(T_VWS_PdfLegende.PL_Sort, 666666666) 
		,CASE 
			WHEN T_VWS_PdfLegende.PL_Type = 'rectangle' THEN 1 
			WHEN T_VWS_PdfLegende.PL_Type = 'legend' THEN 2 
			WHEN T_VWS_PdfLegende.PL_Type = 'image' THEN 3 
			WHEN T_VWS_PdfLegende.PL_Type = 'text' THEN 4 
			ELSE NULL 
		END 
		,T_VWS_PdfLegende.PL_Type 
    ) AS PL_Sort 
    
    --,T_VWS_Ref_PdfLegendenKategorie.* 
FROM T_VWS_Ref_PdfLegendenKategorie 


LEFT JOIN T_Benutzer 
	ON 
	(
		CAST(T_Benutzer.BE_ID AS varchar(50)) = CAST(@BE_ID AS varchar(50)) 
		OR 
		T_Benutzer.BE_Hash = CAST(@BE_ID AS varchar(50)) 
	)
	AND T_Benutzer.BE_Status = 1 

LEFT JOIN T_VWS_Ref_PaperSize 
	ON T_VWS_Ref_PaperSize.PS_UID = T_VWS_Ref_PdfLegendenKategorie.PLK_PS_UID 
    
LEFT JOIN T_VWS_PdfLegende 
	ON T_VWS_PdfLegende.PL_PLK_UID = T_VWS_Ref_PdfLegendenKategorie.PLK_UID 
    AND T_VWS_PdfLegende.PL_Status = 1 

WHERE T_VWS_Ref_PdfLegendenKategorie.PLK_Status = 1 
AND 
(
	T_VWS_PdfLegende.PL_PLK_UID = @PL_PLK_UID 
	OR 
	(
		@PL_PLK_UID IS NULL 
		AND T_VWS_Ref_PdfLegendenKategorie.PLK_DAR_UID IS NULL 
		AND T_VWS_Ref_PdfLegendenKategorie.PLK_IsDefault = 1 
	)
)

ORDER BY 
	 PL_Sort 
