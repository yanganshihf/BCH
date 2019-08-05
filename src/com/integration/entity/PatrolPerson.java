package com.integration.entity;

public class PatrolPerson {
	private String personName;//姓名
	private Integer personSex;//性别
	private String mobile;//电话
	private String identifyPhoto;//照片
	private String uploadTime;
	
	private String departmentName;//管护单位
	private String departmentVal;//管护单位编码
	private String employDate;//聘用日期
	private String unEmployDate;//解聘日期
	private String remark;//备注
	private String id;
	
	private Integer isOnline;
	private Integer authorized;
	private String IMEI;
	private String freezeIMEI;
	private String unfreezeTime;
	
	private Integer freezed;
	private String authorizeTime;
	
	//新增
	private String projectType;
	private String accountNum;
	private String regionName;
	private Double regionArea;
	private String hasRegions;
	private Integer isOnGard;
	
	// 新增字段
	private String nationality;
	private Integer age;
	private String birthplace;
	private String idCode;
	private String birthday;
	private Integer educated;
	private Integer healthy;
	private String homeAddress;
	private Integer medicare;
	private Integer old_age;
	private Integer poverty;
	private String patrolPlace;
	private String superiorTree;
	private Double nationalForestArea;
	private String nationalForestCode;
	private Integer employState;
	private String contractDateBegin;
	private String contractDateEnd;
	private Integer unemployReason;
	private Double regionForestArea;
	private String regionForestCode;
	private String contractPeriod;
	
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getPersonName() {
		return personName;
	}
	public void setPersonName(String personName) {
		this.personName = personName;
	}
	public Integer getPersonSex() {
		return personSex;
	}
	public void setPersonSex(Integer personSex) {
		this.personSex = personSex;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getIdentifyPhoto() {
		return identifyPhoto;
	}
	public void setIdentifyPhoto(String identifyPhoto) {
		this.identifyPhoto = identifyPhoto;
	}
	public String getUploadTime() {
		return uploadTime;
	}
	public void setUploadTime(String uploadTime) {
		this.uploadTime = uploadTime;
	}
	
	public String getDepartmentVal() {
		return departmentVal;
	}
	public void setDepartmentVal(String departmentVal) {
		this.departmentVal = departmentVal;
	}
	public String getEmployDate() {
		return employDate;
	}
	public void setEmployDate(String employDate) {
		this.employDate = employDate;
	}
	public String getunEmployDate() {
		return unEmployDate;
	}
	public void setunEmployDate(String unEmployDate) {
		this.unEmployDate = unEmployDate;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Integer getIsOnline() {
		return isOnline;
	}
	public void setIsOnline(Integer isOnline) {
		this.isOnline = isOnline;
	}
	public Integer getAuthorized() {
		return authorized;
	}
	public void setAuthorized(Integer authorized) {
		this.authorized = authorized;
	}
	public String getIMEI() {
		return IMEI;
	}
	public void setIMEI(String iMEI) {
		IMEI = iMEI;
	}
	public String getFreezeIMEI() {
		return freezeIMEI;
	}
	public void setFreezeIMEI(String freezeIMEI) {
		this.freezeIMEI = freezeIMEI;
	}
	public String getUnfreezeTime() {
		return unfreezeTime;
	}
	public void setUnfreezeTime(String unfreezeTime) {
		this.unfreezeTime = unfreezeTime;
	}
	public Integer getFreezed() {
		return freezed;
	}
	public void setFreezed(Integer freezed) {
		this.freezed = freezed;
	}
	public String getAuthorizeTime() {
		return authorizeTime;
	}
	public void setAuthorizeTime(String authorizeTime) {
		this.authorizeTime = authorizeTime;
	}
	public String getNationality() {
		return nationality;
	}
	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}

	public String getBirthplace() {
		return birthplace;
	}
	public void setBirthplace(String birthplace) {
		this.birthplace = birthplace;
	}

	public String getIdCode() {
		return idCode;
	}
	public void setIdCode(String idCode) {
		this.idCode = idCode;
	}

	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public Integer getEducated() {
		return educated;
	}
	public void setEducated(Integer educated) {
		this.educated = educated;
	}

	public Integer getHealthy() {
		return healthy;
	}
	public void setHealthy(Integer healthy) {
		this.healthy = healthy;
	}

	public String getHomeAddress() {
		return homeAddress;
	}
	public void setHomeAddress(String homeAddress) {
		this.homeAddress = homeAddress;
	}

	public Integer getMedicare() {
		return medicare;
	}
	public void setMedicare(Integer medicare) {
		this.medicare = medicare;
	}

	public Integer getOld_age() {
		return old_age;
	}
	public void setOld_age(Integer old_age) {
		this.old_age = old_age;
	}

	public Integer getPoverty() {
		return poverty;
	}
	public void setPoverty(Integer poverty) {
		this.poverty = poverty;
	}

	public String getPatrolPlace() {
		return patrolPlace;
	}
	public void setPatrolPlace(String patrolPlace) {
		this.patrolPlace = patrolPlace;
	}

	public String getSuperiorTree() {
		return superiorTree;
	}
	public void setSuperiorTree(String superiorTree) {
		this.superiorTree = superiorTree;
	}

	public Double getRegionForestArea() {
		return regionForestArea;
	}
	public void setRegionForestArea(Double regionForestArea) {
		this.regionForestArea = regionForestArea;
	}

	public String getRegionForestCode() {
		return regionForestCode;
	}
	public void setRegionForestCode(String regionForestCode) {
		this.regionForestCode = regionForestCode;
	}
	
	public Double getNationalForestArea() {
		return nationalForestArea;
	}
	public void setNationalForestArea(Double nationalForestArea) {
		this.nationalForestArea = nationalForestArea;
	}

	public String getNationalForestCode() {
		return nationalForestCode;
	}
	public void setNationalForestCode(String nationalForestCode) {
		this.nationalForestCode = nationalForestCode;
	}
	
	public Integer getEmployState() {
		return employState;
	}
	public void setEmployState(Integer employState) {
		this.employState = employState;
	}

	public String getContractDateBegin() {
		return contractDateBegin;
	}
	public void setContractDateBegin(String contractDateBegin) {
		this.contractDateBegin = contractDateBegin;
	}

	public String getContractDateEnd() {
		return contractDateEnd;
	}
	public void setContractDateEnd(String contractDateEnd) {
		this.contractDateEnd = contractDateEnd;
	}
	
	public String getContractPeriod() {
		return contractPeriod;
	}
	public void setContractPeriod(String contractPeriod) {
		this.contractPeriod = contractPeriod;
	}
	
	public Integer getUnemployReason() {
		return unemployReason;
	}
	public void setUnemployReason(Integer unemployReason) {
		this.unemployReason = unemployReason;
	}
	
	public Integer getIsOnGard() {
		return isOnGard;
	}
	public void setIsOnGard(Integer isOnGard) {
		this.isOnGard = isOnGard;
	}
	public String getHasRegions() {
		return hasRegions;
	}
	public void setHasRegions(String hasRegions) {
		this.hasRegions = hasRegions;
	}
	public Double getRegionArea() {
		return regionArea;
	}
	public void setRegionArea(Double regionArea) {
		this.regionArea = regionArea;
	}
	public String getRegionName() {
		return regionName;
	}
	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}
	public String getProjectType() {
		return projectType;
	}

	public void setProjectType(String projectType) {
		this.projectType = projectType;
	}
	public String getAccountNum() {
		return accountNum;
	}
	public void setAccountNum(String accountNum) {
		this.accountNum = accountNum;
	}
}
