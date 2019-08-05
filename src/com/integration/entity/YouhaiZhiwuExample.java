package com.integration.entity;

import java.util.ArrayList;
import java.util.List;

public class YouhaiZhiwuExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public YouhaiZhiwuExample() {
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

        public Criteria andIdIsNull() {
            addCriterion("ID is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("ID is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(String value) {
            addCriterion("ID =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(String value) {
            addCriterion("ID <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(String value) {
            addCriterion("ID >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(String value) {
            addCriterion("ID >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(String value) {
            addCriterion("ID <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(String value) {
            addCriterion("ID <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLike(String value) {
            addCriterion("ID like", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotLike(String value) {
            addCriterion("ID not like", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<String> values) {
            addCriterion("ID in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<String> values) {
            addCriterion("ID not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(String value1, String value2) {
            addCriterion("ID between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(String value1, String value2) {
            addCriterion("ID not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andNameIsNull() {
            addCriterion("name is null");
            return (Criteria) this;
        }

        public Criteria andNameIsNotNull() {
            addCriterion("name is not null");
            return (Criteria) this;
        }

        public Criteria andNameEqualTo(String value) {
            addCriterion("name =", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotEqualTo(String value) {
            addCriterion("name <>", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThan(String value) {
            addCriterion("name >", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThanOrEqualTo(String value) {
            addCriterion("name >=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThan(String value) {
            addCriterion("name <", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThanOrEqualTo(String value) {
            addCriterion("name <=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLike(String value) {
            addCriterion("name like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotLike(String value) {
            addCriterion("name not like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameIn(List<String> values) {
            addCriterion("name in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotIn(List<String> values) {
            addCriterion("name not in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameBetween(String value1, String value2) {
            addCriterion("name between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotBetween(String value1, String value2) {
            addCriterion("name not between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andCodeIsNull() {
            addCriterion("code is null");
            return (Criteria) this;
        }

        public Criteria andCodeIsNotNull() {
            addCriterion("code is not null");
            return (Criteria) this;
        }

        public Criteria andCodeEqualTo(String value) {
            addCriterion("code =", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeNotEqualTo(String value) {
            addCriterion("code <>", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeGreaterThan(String value) {
            addCriterion("code >", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeGreaterThanOrEqualTo(String value) {
            addCriterion("code >=", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeLessThan(String value) {
            addCriterion("code <", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeLessThanOrEqualTo(String value) {
            addCriterion("code <=", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeLike(String value) {
            addCriterion("code like", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeNotLike(String value) {
            addCriterion("code not like", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeIn(List<String> values) {
            addCriterion("code in", values, "code");
            return (Criteria) this;
        }

        public Criteria andCodeNotIn(List<String> values) {
            addCriterion("code not in", values, "code");
            return (Criteria) this;
        }

        public Criteria andCodeBetween(String value1, String value2) {
            addCriterion("code between", value1, value2, "code");
            return (Criteria) this;
        }

        public Criteria andCodeNotBetween(String value1, String value2) {
            addCriterion("code not between", value1, value2, "code");
            return (Criteria) this;
        }

        public Criteria andLadingMIsNull() {
            addCriterion("LADING_M is null");
            return (Criteria) this;
        }

        public Criteria andLadingMIsNotNull() {
            addCriterion("LADING_M is not null");
            return (Criteria) this;
        }

        public Criteria andLadingMEqualTo(String value) {
            addCriterion("LADING_M =", value, "ladingM");
            return (Criteria) this;
        }

        public Criteria andLadingMNotEqualTo(String value) {
            addCriterion("LADING_M <>", value, "ladingM");
            return (Criteria) this;
        }

        public Criteria andLadingMGreaterThan(String value) {
            addCriterion("LADING_M >", value, "ladingM");
            return (Criteria) this;
        }

        public Criteria andLadingMGreaterThanOrEqualTo(String value) {
            addCriterion("LADING_M >=", value, "ladingM");
            return (Criteria) this;
        }

        public Criteria andLadingMLessThan(String value) {
            addCriterion("LADING_M <", value, "ladingM");
            return (Criteria) this;
        }

        public Criteria andLadingMLessThanOrEqualTo(String value) {
            addCriterion("LADING_M <=", value, "ladingM");
            return (Criteria) this;
        }

        public Criteria andLadingMLike(String value) {
            addCriterion("LADING_M like", value, "ladingM");
            return (Criteria) this;
        }

        public Criteria andLadingMNotLike(String value) {
            addCriterion("LADING_M not like", value, "ladingM");
            return (Criteria) this;
        }

        public Criteria andLadingMIn(List<String> values) {
            addCriterion("LADING_M in", values, "ladingM");
            return (Criteria) this;
        }

        public Criteria andLadingMNotIn(List<String> values) {
            addCriterion("LADING_M not in", values, "ladingM");
            return (Criteria) this;
        }

        public Criteria andLadingMBetween(String value1, String value2) {
            addCriterion("LADING_M between", value1, value2, "ladingM");
            return (Criteria) this;
        }

        public Criteria andLadingMNotBetween(String value1, String value2) {
            addCriterion("LADING_M not between", value1, value2, "ladingM");
            return (Criteria) this;
        }

        public Criteria andJiBieIsNull() {
            addCriterion("JI_BIE is null");
            return (Criteria) this;
        }

        public Criteria andJiBieIsNotNull() {
            addCriterion("JI_BIE is not null");
            return (Criteria) this;
        }

        public Criteria andJiBieEqualTo(String value) {
            addCriterion("JI_BIE =", value, "jiBie");
            return (Criteria) this;
        }

        public Criteria andJiBieNotEqualTo(String value) {
            addCriterion("JI_BIE <>", value, "jiBie");
            return (Criteria) this;
        }

        public Criteria andJiBieGreaterThan(String value) {
            addCriterion("JI_BIE >", value, "jiBie");
            return (Criteria) this;
        }

        public Criteria andJiBieGreaterThanOrEqualTo(String value) {
            addCriterion("JI_BIE >=", value, "jiBie");
            return (Criteria) this;
        }

        public Criteria andJiBieLessThan(String value) {
            addCriterion("JI_BIE <", value, "jiBie");
            return (Criteria) this;
        }

        public Criteria andJiBieLessThanOrEqualTo(String value) {
            addCriterion("JI_BIE <=", value, "jiBie");
            return (Criteria) this;
        }

        public Criteria andJiBieLike(String value) {
            addCriterion("JI_BIE like", value, "jiBie");
            return (Criteria) this;
        }

        public Criteria andJiBieNotLike(String value) {
            addCriterion("JI_BIE not like", value, "jiBie");
            return (Criteria) this;
        }

        public Criteria andJiBieIn(List<String> values) {
            addCriterion("JI_BIE in", values, "jiBie");
            return (Criteria) this;
        }

        public Criteria andJiBieNotIn(List<String> values) {
            addCriterion("JI_BIE not in", values, "jiBie");
            return (Criteria) this;
        }

        public Criteria andJiBieBetween(String value1, String value2) {
            addCriterion("JI_BIE between", value1, value2, "jiBie");
            return (Criteria) this;
        }

        public Criteria andJiBieNotBetween(String value1, String value2) {
            addCriterion("JI_BIE not between", value1, value2, "jiBie");
            return (Criteria) this;
        }

        public Criteria andJzzwMcIsNull() {
            addCriterion("JZZW_MC is null");
            return (Criteria) this;
        }

        public Criteria andJzzwMcIsNotNull() {
            addCriterion("JZZW_MC is not null");
            return (Criteria) this;
        }

        public Criteria andJzzwMcEqualTo(String value) {
            addCriterion("JZZW_MC =", value, "jzzwMc");
            return (Criteria) this;
        }

        public Criteria andJzzwMcNotEqualTo(String value) {
            addCriterion("JZZW_MC <>", value, "jzzwMc");
            return (Criteria) this;
        }

        public Criteria andJzzwMcGreaterThan(String value) {
            addCriterion("JZZW_MC >", value, "jzzwMc");
            return (Criteria) this;
        }

        public Criteria andJzzwMcGreaterThanOrEqualTo(String value) {
            addCriterion("JZZW_MC >=", value, "jzzwMc");
            return (Criteria) this;
        }

        public Criteria andJzzwMcLessThan(String value) {
            addCriterion("JZZW_MC <", value, "jzzwMc");
            return (Criteria) this;
        }

        public Criteria andJzzwMcLessThanOrEqualTo(String value) {
            addCriterion("JZZW_MC <=", value, "jzzwMc");
            return (Criteria) this;
        }

        public Criteria andJzzwMcLike(String value) {
            addCriterion("JZZW_MC like", value, "jzzwMc");
            return (Criteria) this;
        }

        public Criteria andJzzwMcNotLike(String value) {
            addCriterion("JZZW_MC not like", value, "jzzwMc");
            return (Criteria) this;
        }

        public Criteria andJzzwMcIn(List<String> values) {
            addCriterion("JZZW_MC in", values, "jzzwMc");
            return (Criteria) this;
        }

        public Criteria andJzzwMcNotIn(List<String> values) {
            addCriterion("JZZW_MC not in", values, "jzzwMc");
            return (Criteria) this;
        }

        public Criteria andJzzwMcBetween(String value1, String value2) {
            addCriterion("JZZW_MC between", value1, value2, "jzzwMc");
            return (Criteria) this;
        }

        public Criteria andJzzwMcNotBetween(String value1, String value2) {
            addCriterion("JZZW_MC not between", value1, value2, "jzzwMc");
            return (Criteria) this;
        }

        public Criteria andJianYiIsNull() {
            addCriterion("JIAN_YI is null");
            return (Criteria) this;
        }

        public Criteria andJianYiIsNotNull() {
            addCriterion("JIAN_YI is not null");
            return (Criteria) this;
        }

        public Criteria andJianYiEqualTo(String value) {
            addCriterion("JIAN_YI =", value, "jianYi");
            return (Criteria) this;
        }

        public Criteria andJianYiNotEqualTo(String value) {
            addCriterion("JIAN_YI <>", value, "jianYi");
            return (Criteria) this;
        }

        public Criteria andJianYiGreaterThan(String value) {
            addCriterion("JIAN_YI >", value, "jianYi");
            return (Criteria) this;
        }

        public Criteria andJianYiGreaterThanOrEqualTo(String value) {
            addCriterion("JIAN_YI >=", value, "jianYi");
            return (Criteria) this;
        }

        public Criteria andJianYiLessThan(String value) {
            addCriterion("JIAN_YI <", value, "jianYi");
            return (Criteria) this;
        }

        public Criteria andJianYiLessThanOrEqualTo(String value) {
            addCriterion("JIAN_YI <=", value, "jianYi");
            return (Criteria) this;
        }

        public Criteria andJianYiLike(String value) {
            addCriterion("JIAN_YI like", value, "jianYi");
            return (Criteria) this;
        }

        public Criteria andJianYiNotLike(String value) {
            addCriterion("JIAN_YI not like", value, "jianYi");
            return (Criteria) this;
        }

        public Criteria andJianYiIn(List<String> values) {
            addCriterion("JIAN_YI in", values, "jianYi");
            return (Criteria) this;
        }

        public Criteria andJianYiNotIn(List<String> values) {
            addCriterion("JIAN_YI not in", values, "jianYi");
            return (Criteria) this;
        }

        public Criteria andJianYiBetween(String value1, String value2) {
            addCriterion("JIAN_YI between", value1, value2, "jianYi");
            return (Criteria) this;
        }

        public Criteria andJianYiNotBetween(String value1, String value2) {
            addCriterion("JIAN_YI not between", value1, value2, "jianYi");
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