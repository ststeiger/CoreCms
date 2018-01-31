
-- DECLARE @PL_UID uniqueidentifier
-- DECLARE @PL_PLK_UID uniqueidentifier
-- DECLARE @PL_Type varchar(255)
-- DECLARE @PL_Format varchar(255)
-- DECLARE @PL_X float
-- DECLARE @PL_Y float
-- DECLARE @PL_W float
-- DECLARE @PL_H float
-- DECLARE @PL_Angle float
-- DECLARE @PL_AspectRatio varchar(255)
-- DECLARE @PL_AlignH nvarchar(255)
-- DECLARE @PL_AlignV nvarchar(255)
-- DECLARE @PL_Text_DE nvarchar(255)
-- DECLARE @PL_Text_FR nvarchar(255)
-- DECLARE @PL_Text_IT nvarchar(255)
-- DECLARE @PL_Text_EN nvarchar(255)
-- DECLARE @PL_Outline bit
-- DECLARE @PL_Style varchar(8000)
-- DECLARE @PL_DataBind nvarchar(255)
-- DECLARE @PL_Sort int



-- SET @PL_UID = '00000000-0000-0000-0000-000000000000'
-- SET @PL_PLK_UID = '00000000-0000-0000-0000-000000000000'
-- SET @PL_Type = '' 
-- SET @PL_Format = '' 
-- SET @PL_X = 0 
-- SET @PL_Y = 0 
-- SET @PL_W = 100
-- SET @PL_H = 100 
-- SET @PL_Angle = 0 
-- SET @PL_AlignH = N'' 
-- SET @PL_AlignV = N'' 
-- SET @PL_Text_DE = N'' 
-- SET @PL_Text_FR = N'' 
-- SET @PL_Text_IT = N'' 
-- SET @PL_Text_EN = N'' 
-- SET @PL_Outline = 0 
-- SET @PL_Style = '' 
-- SET @PL_DataBind = N'' 
-- SET @PL_Sort = 0 

-- SET @PL_UID = ISNULL(NULLIF(NULLIF(@PL_UID, 'custom'), 'null'), NEWID());


IF EXISTS(SELECT * FROM T_VWS_PdfLegende WHERE T_VWS_PdfLegende.PL_Status = 1 AND T_VWS_PdfLegende.PL_UID = @PL_UID) 
BEGIN 
	UPDATE T_VWS_PdfLegende 
		SET  PL_PLK_UID = COALESCE(@PL_PLK_UID, PL_PLK_UID) -- uniqueidentifier 
			,PL_Type = COALESCE(@PL_Type, PL_Type) -- varchar(255) 
			,PL_Format = COALESCE(@PL_Format, PL_Format) -- varchar(255) 

			,PL_X = COALESCE(@PL_X, PL_X) -- float 
			,PL_Y = COALESCE(@PL_Y, PL_Y) -- float 
			,PL_W = COALESCE(@PL_W, PL_W) -- float 
			,PL_H = COALESCE(@PL_H, PL_H) -- float 

			,PL_Angle = COALESCE(@PL_Angle, PL_Angle) -- float 
			,PL_AspectRatio = COALESCE(@PL_AspectRatio, PL_AspectRatio) -- varchar(255) 

			,PL_AlignH = COALESCE(@PL_AlignH, PL_AlignH) -- nvarchar(255) 
			,PL_AlignV = COALESCE(@PL_AlignV, PL_AlignV) -- nvarchar(255) 

			,PL_Text_DE = COALESCE(@PL_Text_DE, PL_Text_DE) -- nvarchar(255) 
			,PL_Text_FR = COALESCE(@PL_Text_FR, PL_Text_FR) -- nvarchar(255) 
			,PL_Text_IT = COALESCE(@PL_Text_IT, PL_Text_IT) -- nvarchar(255) 
			,PL_Text_EN = COALESCE(@PL_Text_EN, PL_Text_EN) -- nvarchar(255) 

			,PL_Outline = COALESCE(@PL_Outline, PL_Outline) -- bit 
			,PL_Style = COALESCE(@PL_Style, PL_Style) -- varchar(8000) 
			,PL_DataBind = COALESCE(@PL_DataBind, PL_DataBind) -- nvarchar(255) 
			,PL_Sort = COALESCE(@PL_Sort, PL_Sort) -- int 
			,PL_Status = COALESCE(PL_Status, 1) -- int 
	WHERE T_VWS_PdfLegende.PL_UID = @PL_UID 
	;
END
ELSE
BEGIN

	INSERT INTO T_VWS_PdfLegende 
	( 
		 PL_UID 
		,PL_PLK_UID 
		,PL_Type 
		,PL_Format 
		,PL_X 
		,PL_Y 
		,PL_W 
		,PL_H 
		,PL_Angle 
		,PL_AspectRatio 
		,PL_AlignH 
		,PL_AlignV 
		,PL_Text_DE 
		,PL_Text_FR 
		,PL_Text_IT 
		,PL_Text_EN 
		,PL_Outline 
		,PL_Style 
		,PL_DataBind 
		,PL_Sort 
		,PL_Status 
	) 
	VALUES 
	( 
		 @PL_UID -- uniqueidentifier 
		,@PL_PLK_UID -- uniqueidentifier 
		,@PL_Type -- varchar(255) 
		,@PL_Format -- varchar(255) 
		,@PL_X -- float 
		,@PL_Y -- float 
		,@PL_W -- float 
		,@PL_H -- float 
		,@PL_Angle -- float 
		,@PL_AspectRatio -- varchar(255) 
		,@PL_AlignH -- nvarchar(255) 
		,@PL_AlignV -- nvarchar(255) 
		,@PL_Text_DE -- nvarchar(255) 
		,@PL_Text_FR -- nvarchar(255) 
		,@PL_Text_IT -- nvarchar(255) 
		,@PL_Text_EN -- nvarchar(255) 
		,@PL_Outline -- bit 
		,@PL_Style -- varchar(8000) 
		,@PL_DataBind -- nvarchar(255) 
		,@PL_Sort -- int 
		,1 -- PL_Status int 
	); 
END 
