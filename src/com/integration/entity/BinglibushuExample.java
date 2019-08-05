package com.integration.entity;

import java.util.ArrayList;
import java.util.List;

public class BinglibushuExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public BinglibushuExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andObjectIdIsNull() {
            addCriterion("Object_ID is null");
            return (Criteria) this;
        }

        public Criteria andObjectIdIsNotNull() {
            addCriterion("Object_ID is not null");
            return (Criteria) this;
        }

        public Criteria andObjectIdEqualTo(String value) {
            addCriterion("Object_ID =", value, "objectId");
            return (Criteria) this;
        }

        public Criteria andObjectIdNotEqualTo(String value) {
            addCriterion("Object_ID <>", value, "objectId");
            return (Criteria) this;
        }

        public Criteria andObjectIdGreaterThan(String value) {
            addCriterion("Object_ID >", value, "objectId");
            return (Criteria) this;
        }

        public Criteria andObjectIdGreaterThanOrEqualTo(String value) {
            addCriterion("Object_ID >=", value, "objectId");
            return (Criteria) this;
        }

        public Criteria andObjectIdLessThan(String value) {
            addCriterion("Object_ID <", value, "objectId");
            return (Criteria) this;
        }

        public Criteria andObjectIdLessThanOrEqualTo(String value) {
            addCriterion("Object_ID <=", value, "objectId");
            return (Criteria) this;
        }

        public Criteria andObjectIdLike(String value) {
            addCriterion("Object_ID like", value, "objectId");
            return (Criteria) this;
        }

        public Criteria andObjectIdNotLike(String value) {
            addCriterion("Object_ID not like", value, "objectId");
            return (Criteria) this;
        }

        public Criteria andObjectIdIn(List<String> values) {
            addCriterion("Object_ID in", values, "objectId");
            return (Criteria) this;
        }

        public Criteria andObjectIdNotIn(List<String> values) {
            addCriterion("Object_ID not in", values, "objectId");
            return (Criteria) this;
        }

        public Criteria andObjectIdBetween(String value1, String value2) {
            addCriterion("Object_ID between", value1, value2, "objectId");
            return (Criteria) this;
        }

        public Criteria andObjectIdNotBetween(String value1, String value2) {
            addCriterion("Object_ID not between", value1, value2, "objectId");
            return (Criteria) this;
        }

        public Criteria andCuntunIsNull() {
            addCriterion("cuntun is null");
            return (Criteria) this;
        }

        public Criteria andCuntunIsNotNull() {
            addCriterion("cuntun is not null");
            return (Criteria) this;
        }

        public Criteria andCuntunEqualTo(String value) {
            addCriterion("cuntun =", value, "cuntun");
            return (Criteria) this;
        }

        public Criteria andCuntunNotEqualTo(String value) {
            addCriterion("cuntun <>", value, "cuntun");
            return (Criteria) this;
        }

        public Criteria andCuntunGreaterThan(String value) {
            addCriterion("cuntun >", value, "cuntun");
            return (Criteria) this;
        }

        public Criteria andCuntunGreaterThanOrEqualTo(String value) {
            addCriterion("cuntun >=", value, "cuntun");
            return (Criteria) this;
        }

        public Criteria andCuntunLessThan(String value) {
            addCriterion("cuntun <", value, "cuntun");
            return (Criteria) this;
        }

        public Criteria andCuntunLessThanOrEqualTo(String value) {
            addCriterion("cuntun <=", value, "cuntun");
            return (Criteria) this;
        }

        public Criteria andCuntunLike(String value) {
            addCriterion("cuntun like", value, "cuntun");
            return (Criteria) this;
        }

        public Criteria andCuntunNotLike(String value) {
            addCriterion("cuntun not like", value, "cuntun");
            return (Criteria) this;
        }

        public Criteria andCuntunIn(List<String> values) {
            addCriterion("cuntun in", values, "cuntun");
            return (Criteria) this;
        }

        public Criteria andCuntunNotIn(List<String> values) {
            addCriterion("cuntun not in", values, "cuntun");
            return (Criteria) this;
        }

        public Criteria andCuntunBetween(String value1, String value2) {
            addCriterion("cuntun between", value1, value2, "cuntun");
            return (Criteria) this;
        }

        public Criteria andCuntunNotBetween(String value1, String value2) {
            addCriterion("cuntun not between", value1, value2, "cuntun");
            return (Criteria) this;
        }

        public Criteria andDanWeiIsNull() {
            addCriterion("DAN_WEI is null");
            return (Criteria) this;
        }

        public Criteria andDanWeiIsNotNull() {
            addCriterion("DAN_WEI is not null");
            return (Criteria) this;
        }

        public Criteria andDanWeiEqualTo(String value) {
            addCriterion("DAN_WEI =", value, "danWei");
            return (Criteria) this;
        }

        public Criteria andDanWeiNotEqualTo(String value) {
            addCriterion("DAN_WEI <>", value, "danWei");
            return (Criteria) this;
        }

        public Criteria andDanWeiGreaterThan(String value) {
            addCriterion("DAN_WEI >", value, "danWei");
            return (Criteria) this;
        }

        public Criteria andDanWeiGreaterThanOrEqualTo(String value) {
            addCriterion("DAN_WEI >=", value, "danWei");
            return (Criteria) this;
        }

        public Criteria andDanWeiLessThan(String value) {
            addCriterion("DAN_WEI <", value, "danWei");
            return (Criteria) this;
        }

        public Criteria andDanWeiLessThanOrEqualTo(String value) {
            addCriterion("DAN_WEI <=", value, "danWei");
            return (Criteria) this;
        }

        public Criteria andDanWeiLike(String value) {
            addCriterion("DAN_WEI like", value, "danWei");
            return (Criteria) this;
        }

        public Criteria andDanWeiNotLike(String value) {
            addCriterion("DAN_WEI not like", value, "danWei");
            return (Criteria) this;
        }

        public Criteria andDanWeiIn(List<String> values) {
            addCriterion("DAN_WEI in", values, "danWei");
            return (Criteria) this;
        }

        public Criteria andDanWeiNotIn(List<String> values) {
            addCriterion("DAN_WEI not in", values, "danWei");
            return (Criteria) this;
        }

        public Criteria andDanWeiBetween(String value1, String value2) {
            addCriterion("DAN_WEI between", value1, value2, "danWei");
            return (Criteria) this;
        }

        public Criteria andDanWeiNotBetween(String value1, String value2) {
            addCriterion("DAN_WEI not between", value1, value2, "danWei");
            return (Criteria) this;
        }

        public Criteria andDuiwuQkIsNull() {
            addCriterion("DUIWU_QK is null");
            return (Criteria) this;
        }

        public Criteria andDuiwuQkIsNotNull() {
            addCriterion("DUIWU_QK is not null");
            return (Criteria) this;
        }

        public Criteria andDuiwuQkEqualTo(String value) {
            addCriterion("DUIWU_QK =", value, "duiwuQk");
            return (Criteria) this;
        }

        public Criteria andDuiwuQkNotEqualTo(String value) {
            addCriterion("DUIWU_QK <>", value, "duiwuQk");
            return (Criteria) this;
        }

        public Criteria andDuiwuQkGreaterThan(String value) {
            addCriterion("DUIWU_QK >", value, "duiwuQk");
            return (Criteria) this;
        }

        public Criteria andDuiwuQkGreaterThanOrEqualTo(String value) {
            addCriterion("DUIWU_QK >=", value, "duiwuQk");
            return (Criteria) this;
        }

        public Criteria andDuiwuQkLessThan(String value) {
            addCriterion("DUIWU_QK <", value, "duiwuQk");
            return (Criteria) this;
        }

        public Criteria andDuiwuQkLessThanOrEqualTo(String value) {
            addCriterion("DUIWU_QK <=", value, "duiwuQk");
            return (Criteria) this;
        }

        public Criteria andDuiwuQkLike(String value) {
            addCriterion("DUIWU_QK like", value, "duiwuQk");
            return (Criteria) this;
        }

        public Criteria andDuiwuQkNotLike(String value) {
            addCriterion("DUIWU_QK not like", value, "duiwuQk");
            return (Criteria) this;
        }

        public Criteria andDuiwuQkIn(List<String> values) {
            addCriterion("DUIWU_QK in", values, "duiwuQk");
            return (Criteria) this;
        }

        public Criteria andDuiwuQkNotIn(List<String> values) {
            addCriterion("DUIWU_QK not in", values, "duiwuQk");
            return (Criteria) this;
        }

        public Criteria andDuiwuQkBetween(String value1, String value2) {
            addCriterion("DUIWU_QK between", value1, value2, "duiwuQk");
            return (Criteria) this;
        }

        public Criteria andDuiwuQkNotBetween(String value1, String value2) {
            addCriterion("DUIWU_QK not between", value1, value2, "duiwuQk");
            return (Criteria) this;
        }

        public Criteria andDuiYuanIsNull() {
            addCriterion("DUI_YUAN is null");
            return (Criteria) this;
        }

        public Criteria andDuiYuanIsNotNull() {
            addCriterion("DUI_YUAN is not null");
            return (Criteria) this;
        }

        public Criteria andDuiYuanEqualTo(Integer value) {
            addCriterion("DUI_YUAN =", value, "duiYuan");
            return (Criteria) this;
        }

        public Criteria andDuiYuanNotEqualTo(Integer value) {
            addCriterion("DUI_YUAN <>", value, "duiYuan");
            return (Criteria) this;
        }

        public Criteria andDuiYuanGreaterThan(Integer value) {
            addCriterion("DUI_YUAN >", value, "duiYuan");
            return (Criteria) this;
        }

        public Criteria andDuiYuanGreaterThanOrEqualTo(Integer value) {
            addCriterion("DUI_YUAN >=", value, "duiYuan");
            return (Criteria) this;
        }

        public Criteria andDuiYuanLessThan(Integer value) {
            addCriterion("DUI_YUAN <", value, "duiYuan");
            return (Criteria) this;
        }

        public Criteria andDuiYuanLessThanOrEqualTo(Integer value) {
            addCriterion("DUI_YUAN <=", value, "duiYuan");
            return (Criteria) this;
        }

        public Criteria andDuiYuanIn(List<Integer> values) {
            addCriterion("DUI_YUAN in", values, "duiYuan");
            return (Criteria) this;
        }

        public Criteria andDuiYuanNotIn(List<Integer> values) {
            addCriterion("DUI_YUAN not in", values, "duiYuan");
            return (Criteria) this;
        }

        public Criteria andDuiYuanBetween(Integer value1, Integer value2) {
            addCriterion("DUI_YUAN between", value1, value2, "duiYuan");
            return (Criteria) this;
        }

        public Criteria andDuiYuanNotBetween(Integer value1, Integer value2) {
            addCriterion("DUI_YUAN not between", value1, value2, "duiYuan");
            return (Criteria) this;
        }

        public Criteria andFengliMhjIsNull() {
            addCriterion("FENGLI_MHJ is null");
            return (Criteria) this;
        }

        public Criteria andFengliMhjIsNotNull() {
            addCriterion("FENGLI_MHJ is not null");
            return (Criteria) this;
        }

        public Criteria andFengliMhjEqualTo(Integer value) {
            addCriterion("FENGLI_MHJ =", value, "fengliMhj");
            return (Criteria) this;
        }

        public Criteria andFengliMhjNotEqualTo(Integer value) {
            addCriterion("FENGLI_MHJ <>", value, "fengliMhj");
            return (Criteria) this;
        }

        public Criteria andFengliMhjGreaterThan(Integer value) {
            addCriterion("FENGLI_MHJ >", value, "fengliMhj");
            return (Criteria) this;
        }

        public Criteria andFengliMhjGreaterThanOrEqualTo(Integer value) {
            addCriterion("FENGLI_MHJ >=", value, "fengliMhj");
            return (Criteria) this;
        }

        public Criteria andFengliMhjLessThan(Integer value) {
            addCriterion("FENGLI_MHJ <", value, "fengliMhj");
            return (Criteria) this;
        }

        public Criteria andFengliMhjLessThanOrEqualTo(Integer value) {
            addCriterion("FENGLI_MHJ <=", value, "fengliMhj");
            return (Criteria) this;
        }

        public Criteria andFengliMhjIn(List<Integer> values) {
            addCriterion("FENGLI_MHJ in", values, "fengliMhj");
            return (Criteria) this;
        }

        public Criteria andFengliMhjNotIn(List<Integer> values) {
            addCriterion("FENGLI_MHJ not in", values, "fengliMhj");
            return (Criteria) this;
        }

        public Criteria andFengliMhjBetween(Integer value1, Integer value2) {
            addCriterion("FENGLI_MHJ between", value1, value2, "fengliMhj");
            return (Criteria) this;
        }

        public Criteria andFengliMhjNotBetween(Integer value1, Integer value2) {
            addCriterion("FENGLI_MHJ not between", value1, value2, "fengliMhj");
            return (Criteria) this;
        }

        public Criteria andErhaoGjIsNull() {
            addCriterion("ERHAO_GJ is null");
            return (Criteria) this;
        }

        public Criteria andErhaoGjIsNotNull() {
            addCriterion("ERHAO_GJ is not null");
            return (Criteria) this;
        }

        public Criteria andErhaoGjEqualTo(Integer value) {
            addCriterion("ERHAO_GJ =", value, "erhaoGj");
            return (Criteria) this;
        }

        public Criteria andErhaoGjNotEqualTo(Integer value) {
            addCriterion("ERHAO_GJ <>", value, "erhaoGj");
            return (Criteria) this;
        }

        public Criteria andErhaoGjGreaterThan(Integer value) {
            addCriterion("ERHAO_GJ >", value, "erhaoGj");
            return (Criteria) this;
        }

        public Criteria andErhaoGjGreaterThanOrEqualTo(Integer value) {
            addCriterion("ERHAO_GJ >=", value, "erhaoGj");
            return (Criteria) this;
        }

        public Criteria andErhaoGjLessThan(Integer value) {
            addCriterion("ERHAO_GJ <", value, "erhaoGj");
            return (Criteria) this;
        }

        public Criteria andErhaoGjLessThanOrEqualTo(Integer value) {
            addCriterion("ERHAO_GJ <=", value, "erhaoGj");
            return (Criteria) this;
        }

        public Criteria andErhaoGjIn(List<Integer> values) {
            addCriterion("ERHAO_GJ in", values, "erhaoGj");
            return (Criteria) this;
        }

        public Criteria andErhaoGjNotIn(List<Integer> values) {
            addCriterion("ERHAO_GJ not in", values, "erhaoGj");
            return (Criteria) this;
        }

        public Criteria andErhaoGjBetween(Integer value1, Integer value2) {
            addCriterion("ERHAO_GJ between", value1, value2, "erhaoGj");
            return (Criteria) this;
        }

        public Criteria andErhaoGjNotBetween(Integer value1, Integer value2) {
            addCriterion("ERHAO_GJ not between", value1, value2, "erhaoGj");
            return (Criteria) this;
        }

        public Criteria andChezaiTaiIsNull() {
            addCriterion("CHEZAI_TAI is null");
            return (Criteria) this;
        }

        public Criteria andChezaiTaiIsNotNull() {
            addCriterion("CHEZAI_TAI is not null");
            return (Criteria) this;
        }

        public Criteria andChezaiTaiEqualTo(Integer value) {
            addCriterion("CHEZAI_TAI =", value, "chezaiTai");
            return (Criteria) this;
        }

        public Criteria andChezaiTaiNotEqualTo(Integer value) {
            addCriterion("CHEZAI_TAI <>", value, "chezaiTai");
            return (Criteria) this;
        }

        public Criteria andChezaiTaiGreaterThan(Integer value) {
            addCriterion("CHEZAI_TAI >", value, "chezaiTai");
            return (Criteria) this;
        }

        public Criteria andChezaiTaiGreaterThanOrEqualTo(Integer value) {
            addCriterion("CHEZAI_TAI >=", value, "chezaiTai");
            return (Criteria) this;
        }

        public Criteria andChezaiTaiLessThan(Integer value) {
            addCriterion("CHEZAI_TAI <", value, "chezaiTai");
            return (Criteria) this;
        }

        public Criteria andChezaiTaiLessThanOrEqualTo(Integer value) {
            addCriterion("CHEZAI_TAI <=", value, "chezaiTai");
            return (Criteria) this;
        }

        public Criteria andChezaiTaiIn(List<Integer> values) {
            addCriterion("CHEZAI_TAI in", values, "chezaiTai");
            return (Criteria) this;
        }

        public Criteria andChezaiTaiNotIn(List<Integer> values) {
            addCriterion("CHEZAI_TAI not in", values, "chezaiTai");
            return (Criteria) this;
        }

        public Criteria andChezaiTaiBetween(Integer value1, Integer value2) {
            addCriterion("CHEZAI_TAI between", value1, value2, "chezaiTai");
            return (Criteria) this;
        }

        public Criteria andChezaiTaiNotBetween(Integer value1, Integer value2) {
            addCriterion("CHEZAI_TAI not between", value1, value2, "chezaiTai");
            return (Criteria) this;
        }

        public Criteria andDuijiangJIsNull() {
            addCriterion("DUIJIANG_J is null");
            return (Criteria) this;
        }

        public Criteria andDuijiangJIsNotNull() {
            addCriterion("DUIJIANG_J is not null");
            return (Criteria) this;
        }

        public Criteria andDuijiangJEqualTo(Integer value) {
            addCriterion("DUIJIANG_J =", value, "duijiangJ");
            return (Criteria) this;
        }

        public Criteria andDuijiangJNotEqualTo(Integer value) {
            addCriterion("DUIJIANG_J <>", value, "duijiangJ");
            return (Criteria) this;
        }

        public Criteria andDuijiangJGreaterThan(Integer value) {
            addCriterion("DUIJIANG_J >", value, "duijiangJ");
            return (Criteria) this;
        }

        public Criteria andDuijiangJGreaterThanOrEqualTo(Integer value) {
            addCriterion("DUIJIANG_J >=", value, "duijiangJ");
            return (Criteria) this;
        }

        public Criteria andDuijiangJLessThan(Integer value) {
            addCriterion("DUIJIANG_J <", value, "duijiangJ");
            return (Criteria) this;
        }

        public Criteria andDuijiangJLessThanOrEqualTo(Integer value) {
            addCriterion("DUIJIANG_J <=", value, "duijiangJ");
            return (Criteria) this;
        }

        public Criteria andDuijiangJIn(List<Integer> values) {
            addCriterion("DUIJIANG_J in", values, "duijiangJ");
            return (Criteria) this;
        }

        public Criteria andDuijiangJNotIn(List<Integer> values) {
            addCriterion("DUIJIANG_J not in", values, "duijiangJ");
            return (Criteria) this;
        }

        public Criteria andDuijiangJBetween(Integer value1, Integer value2) {
            addCriterion("DUIJIANG_J between", value1, value2, "duijiangJ");
            return (Criteria) this;
        }

        public Criteria andDuijiangJNotBetween(Integer value1, Integer value2) {
            addCriterion("DUIJIANG_J not between", value1, value2, "duijiangJ");
            return (Criteria) this;
        }

        public Criteria andYunbingCIsNull() {
            addCriterion("YUNBING_C is null");
            return (Criteria) this;
        }

        public Criteria andYunbingCIsNotNull() {
            addCriterion("YUNBING_C is not null");
            return (Criteria) this;
        }

        public Criteria andYunbingCEqualTo(Integer value) {
            addCriterion("YUNBING_C =", value, "yunbingC");
            return (Criteria) this;
        }

        public Criteria andYunbingCNotEqualTo(Integer value) {
            addCriterion("YUNBING_C <>", value, "yunbingC");
            return (Criteria) this;
        }

        public Criteria andYunbingCGreaterThan(Integer value) {
            addCriterion("YUNBING_C >", value, "yunbingC");
            return (Criteria) this;
        }

        public Criteria andYunbingCGreaterThanOrEqualTo(Integer value) {
            addCriterion("YUNBING_C >=", value, "yunbingC");
            return (Criteria) this;
        }

        public Criteria andYunbingCLessThan(Integer value) {
            addCriterion("YUNBING_C <", value, "yunbingC");
            return (Criteria) this;
        }

        public Criteria andYunbingCLessThanOrEqualTo(Integer value) {
            addCriterion("YUNBING_C <=", value, "yunbingC");
            return (Criteria) this;
        }

        public Criteria andYunbingCIn(List<Integer> values) {
            addCriterion("YUNBING_C in", values, "yunbingC");
            return (Criteria) this;
        }

        public Criteria andYunbingCNotIn(List<Integer> values) {
            addCriterion("YUNBING_C not in", values, "yunbingC");
            return (Criteria) this;
        }

        public Criteria andYunbingCBetween(Integer value1, Integer value2) {
            addCriterion("YUNBING_C between", value1, value2, "yunbingC");
            return (Criteria) this;
        }

        public Criteria andYunbingCNotBetween(Integer value1, Integer value2) {
            addCriterion("YUNBING_C not between", value1, value2, "yunbingC");
            return (Criteria) this;
        }

        public Criteria andZhihuiCIsNull() {
            addCriterion("ZHIHUI_C is null");
            return (Criteria) this;
        }

        public Criteria andZhihuiCIsNotNull() {
            addCriterion("ZHIHUI_C is not null");
            return (Criteria) this;
        }

        public Criteria andZhihuiCEqualTo(Integer value) {
            addCriterion("ZHIHUI_C =", value, "zhihuiC");
            return (Criteria) this;
        }

        public Criteria andZhihuiCNotEqualTo(Integer value) {
            addCriterion("ZHIHUI_C <>", value, "zhihuiC");
            return (Criteria) this;
        }

        public Criteria andZhihuiCGreaterThan(Integer value) {
            addCriterion("ZHIHUI_C >", value, "zhihuiC");
            return (Criteria) this;
        }

        public Criteria andZhihuiCGreaterThanOrEqualTo(Integer value) {
            addCriterion("ZHIHUI_C >=", value, "zhihuiC");
            return (Criteria) this;
        }

        public Criteria andZhihuiCLessThan(Integer value) {
            addCriterion("ZHIHUI_C <", value, "zhihuiC");
            return (Criteria) this;
        }

        public Criteria andZhihuiCLessThanOrEqualTo(Integer value) {
            addCriterion("ZHIHUI_C <=", value, "zhihuiC");
            return (Criteria) this;
        }

        public Criteria andZhihuiCIn(List<Integer> values) {
            addCriterion("ZHIHUI_C in", values, "zhihuiC");
            return (Criteria) this;
        }

        public Criteria andZhihuiCNotIn(List<Integer> values) {
            addCriterion("ZHIHUI_C not in", values, "zhihuiC");
            return (Criteria) this;
        }

        public Criteria andZhihuiCBetween(Integer value1, Integer value2) {
            addCriterion("ZHIHUI_C between", value1, value2, "zhihuiC");
            return (Criteria) this;
        }

        public Criteria andZhihuiCNotBetween(Integer value1, Integer value2) {
            addCriterion("ZHIHUI_C not between", value1, value2, "zhihuiC");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}