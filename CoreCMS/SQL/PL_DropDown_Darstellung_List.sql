
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
	 T_VWS_Ref_Darstellung.DAR_UID AS v 

	,
	CASE T_Benutzer.BE_Language
		WHEN 'FR' THEN ISNULL(NULLIF(T_VWS_Ref_Darstellung.DAR_Lang_FR, ''), 'N''est pas traduit - UID: ' + CAST(T_VWS_Ref_Darstellung.DAR_UID AS varchar(36))) 
		WHEN 'IT' THEN ISNULL(NULLIF(T_VWS_Ref_Darstellung.DAR_Lang_IT, ''), 'Non è tradotto - UID: ' + CAST(T_VWS_Ref_Darstellung.DAR_UID AS varchar(36))) 
		WHEN 'EN' THEN ISNULL(NULLIF(T_VWS_Ref_Darstellung.DAR_Lang_EN, ''), 'Not translated - UID: ' + CAST(T_VWS_Ref_Darstellung.DAR_UID AS varchar(36)) )
		ELSE ISNULL(NULLIF(T_VWS_Ref_Darstellung.DAR_Lang_DE, ''), 'Nicht übersetzt - UID: ' + CAST(T_VWS_Ref_Darstellung.DAR_UID AS varchar(36))) 
	END AS t 

	,
	CASE 
		WHEN T_VWS_Ref_Darstellung.DAR_Lang_DE = 'All' THEN 1
		ELSE 0
	END AS s 

FROM T_VWS_Ref_Darstellung 

LEFT JOIN T_Benutzer 
	ON 
	(
		CAST(T_Benutzer.BE_ID AS varchar(50)) = CAST(@BE_ID AS varchar(50)) 
		OR 
		T_Benutzer.BE_Hash = CAST(@BE_ID AS varchar(50)) 
	)
	AND T_Benutzer.BE_Status = 1 

WHERE T_VWS_Ref_Darstellung.DAR_Status = 1 

ORDER BY 
	 --DAR_Sort 
	t 
