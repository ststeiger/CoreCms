
-- DECLARE @PLK_UID uniqueidentifier
-- DECLARE @PLK_Code varchar(10)
-- DECLARE @PLK_PS_UID uniqueidentifier
-- DECLARE @PLK_DAR_UID uniqueidentifier
-- DECLARE @PLK_Name_DE nvarchar(255)
-- DECLARE @PLK_Name_FR nvarchar(255)
-- DECLARE @PLK_Name_IT nvarchar(255)
-- DECLARE @PLK_Name_EN nvarchar(255)
-- DECLARE @PLK_IsDefault bit
-- DECLARE @PLK_Status int


-- SET @PLK_UID = '831192E2-01C8-4124-82F7-4154ECB586A0'
-- SET @PLK_Code = '' 
-- SET @PLK_PS_UID = '3B3E8ACE-9264-4159-86E2-1D224CFF97EB' --  A4 Hoch
-- SET @PLK_DAR_UID = NULL 
-- SET @PLK_Name_DE = N'LoL'
-- SET @PLK_Name_FR = N'LoL'
-- SET @PLK_Name_IT = N'LoL'
-- SET @PLK_Name_EN = N'LoL'
-- SET @PLK_IsDefault = 'false'
-- SET @PLK_Status = 1


INSERT INTO T_VWS_Ref_PdfLegendenKategorie 
( 
	 PLK_UID 
	,PLK_Code 
	,PLK_PS_UID 
	,PLK_DAR_UID 
	,PLK_Name_DE 
	,PLK_Name_FR 
	,PLK_Name_IT 
	,PLK_Name_EN 
	,PLK_IsDefault 
	,PLK_Status 
) 
VALUES 
( 
	 @PLK_UID -- uniqueidentifier 
	,@PLK_Code -- varchar(10) 
	,@PLK_PS_UID -- uniqueidentifier 
	,@PLK_DAR_UID -- uniqueidentifier 
	,@PLK_Name_DE -- nvarchar(255) 
	,@PLK_Name_FR -- nvarchar(255) 
	,@PLK_Name_IT -- nvarchar(255) 
	,@PLK_Name_EN -- nvarchar(255) 
	,@PLK_IsDefault -- bit 
	,@PLK_Status -- int 
); 
