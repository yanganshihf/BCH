package com.integration.entity;

import java.util.ArrayList;
import java.util.List;

public class GuanjianzhibiaoExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public GuanjianzhibiaoExample() {
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

        public Criteria andLinchangIsNull() {
            addCriterion("linchang is null");
            return (Criteria) this;
        }

        public Criteria andLinchangIsNotNull() {
            addCriterion("linchang is not null");
            return (Criteria) this;
        }

        public Criteria andLinchangEqualTo(String value) {
            addCriterion("linchang =", value, "linchang");
            return (Criteria) this;
        }

        public Criteria andLinchangNotEqualTo(String value) {
            addCriterion("linchang <>", value, "linchang");
            return (Criteria) this;
        }

        public Criteria andLinchangGreaterThan(String value) {
            addCriterion("linchang >", value, "linchang");
            return (Criteria) this;
        }

        public Criteria andLinchangGreaterThanOrEqualTo(String value) {
            addCriterion("linchang >=", value, "linchang");
            return (Criteria) this;
        }

        public Criteria andLinchangLessThan(String value) {
            addCriterion("linchang <", value, "linchang");
            return (Criteria) this;
        }

        public Criteria andLinchangLessThanOrEqualTo(String value) {
            addCriterion("linchang <=", value, "linchang");
            return (Criteria) this;
        }

        public Criteria andLinchangLike(String value) {
            addCriterion("linchang like", value, "linchang");
            return (Criteria) this;
        }

        public Criteria andLinchangNotLike(String value) {
            addCriterion("linchang not like", value, "linchang");
            return (Criteria) this;
        }

        public Criteria andLinchangIn(List<String> values) {
            addCriterion("linchang in", values, "linchang");
            return (Criteria) this;
        }

        public Criteria andLinchangNotIn(List<String> values) {
            addCriterion("linchang not in", values, "linchang");
            return (Criteria) this;
        }

        public Criteria andLinchangBetween(String value1, String value2) {
            addCriterion("linchang between", value1, value2, "linchang");
            return (Criteria) this;
        }

        public Criteria andLinchangNotBetween(String value1, String value2) {
            addCriterion("linchang not between", value1, value2, "linchang");
            return (Criteria) this;
        }

        public Criteria andLinchangnameIsNull() {
            addCriterion("\"linchangName \" is null");
            return (Criteria) this;
        }

        public Criteria andLinchangnameIsNotNull() {
            addCriterion("\"linchangName \" is not null");
            return (Criteria) this;
        }

        public Criteria andLinchangnameEqualTo(String value) {
            addCriterion("\"linchangName \" =", value, "linchangname");
            return (Criteria) this;
        }

        public Criteria andLinchangnameNotEqualTo(String value) {
            addCriterion("\"linchangName \" <>", value, "linchangname");
            return (Criteria) this;
        }

        public Criteria andLinchangnameGreaterThan(String value) {
            addCriterion("\"linchangName \" >", value, "linchangname");
            return (Criteria) this;
        }

        public Criteria andLinchangnameGreaterThanOrEqualTo(String value) {
            addCriterion("\"linchangName \" >=", value, "linchangname");
            return (Criteria) this;
        }

        public Criteria andLinchangnameLessThan(String value) {
            addCriterion("\"linchangName \" <", value, "linchangname");
            return (Criteria) this;
        }

        public Criteria andLinchangnameLessThanOrEqualTo(String value) {
            addCriterion("\"linchangName \" <=", value, "linchangname");
            return (Criteria) this;
        }

        public Criteria andLinchangnameLike(String value) {
            addCriterion("\"linchangName \" like", value, "linchangname");
            return (Criteria) this;
        }

        public Criteria andLinchangnameNotLike(String value) {
            addCriterion("\"linchangName \" not like", value, "linchangname");
            return (Criteria) this;
        }

        public Criteria andLinchangnameIn(List<String> values) {
            addCriterion("\"linchangName \" in", values, "linchangname");
            return (Criteria) this;
        }

        public Criteria andLinchangnameNotIn(List<String> values) {
            addCriterion("\"linchangName \" not in", values, "linchangname");
            return (Criteria) this;
        }

        public Criteria andLinchangnameBetween(String value1, String value2) {
            addCriterion("\"linchangName \" between", value1, value2, "linchangname");
            return (Criteria) this;
        }

        public Criteria andLinchangnameNotBetween(String value1, String value2) {
            addCriterion("\"linchangName \" not between", value1, value2, "linchangname");
            return (Criteria) this;
        }

        public Criteria andSlfglIsNull() {
            addCriterion("slfgl is null");
            return (Criteria) this;
        }

        public Criteria andSlfglIsNotNull() {
            addCriterion("slfgl is not null");
            return (Criteria) this;
        }

        public Criteria andSlfglEqualTo(Double value) {
            addCriterion("slfgl =", value, "slfgl");
            return (Criteria) this;
        }

        public Criteria andSlfglNotEqualTo(Double value) {
            addCriterion("slfgl <>", value, "slfgl");
            return (Criteria) this;
        }

        public Criteria andSlfglGreaterThan(Double value) {
            addCriterion("slfgl >", value, "slfgl");
            return (Criteria) this;
        }

        public Criteria andSlfglGreaterThanOrEqualTo(Double value) {
            addCriterion("slfgl >=", value, "slfgl");
            return (Criteria) this;
        }

        public Criteria andSlfglLessThan(Double value) {
            addCriterion("slfgl <", value, "slfgl");
            return (Criteria) this;
        }

        public Criteria andSlfglLessThanOrEqualTo(Double value) {
            addCriterion("slfgl <=", value, "slfgl");
            return (Criteria) this;
        }

        public Criteria andSlfglIn(List<Double> values) {
            addCriterion("slfgl in", values, "slfgl");
            return (Criteria) this;
        }

        public Criteria andSlfglNotIn(List<Double> values) {
            addCriterion("slfgl not in", values, "slfgl");
            return (Criteria) this;
        }

        public Criteria andSlfglBetween(Double value1, Double value2) {
            addCriterion("slfgl between", value1, value2, "slfgl");
            return (Criteria) this;
        }

        public Criteria andSlfglNotBetween(Double value1, Double value2) {
            addCriterion("slfgl not between", value1, value2, "slfgl");
            return (Criteria) this;
        }

        public Criteria andLdmjIsNull() {
            addCriterion("ldmj is null");
            return (Criteria) this;
        }

        public Criteria andLdmjIsNotNull() {
            addCriterion("ldmj is not null");
            return (Criteria) this;
        }

        public Criteria andLdmjEqualTo(Double value) {
            addCriterion("ldmj =", value, "ldmj");
            return (Criteria) this;
        }

        public Criteria andLdmjNotEqualTo(Double value) {
            addCriterion("ldmj <>", value, "ldmj");
            return (Criteria) this;
        }

        public Criteria andLdmjGreaterThan(Double value) {
            addCriterion("ldmj >", value, "ldmj");
            return (Criteria) this;
        }

        public Criteria andLdmjGreaterThanOrEqualTo(Double value) {
            addCriterion("ldmj >=", value, "ldmj");
            return (Criteria) this;
        }

        public Criteria andLdmjLessThan(Double value) {
            addCriterion("ldmj <", value, "ldmj");
            return (Criteria) this;
        }

        public Criteria andLdmjLessThanOrEqualTo(Double value) {
            addCriterion("ldmj <=", value, "ldmj");
            return (Criteria) this;
        }

        public Criteria andLdmjIn(List<Double> values) {
            addCriterion("ldmj in", values, "ldmj");
            return (Criteria) this;
        }

        public Criteria andLdmjNotIn(List<Double> values) {
            addCriterion("ldmj not in", values, "ldmj");
            return (Criteria) this;
        }

        public Criteria andLdmjBetween(Double value1, Double value2) {
            addCriterion("ldmj between", value1, value2, "ldmj");
            return (Criteria) this;
        }

        public Criteria andLdmjNotBetween(Double value1, Double value2) {
            addCriterion("ldmj not between", value1, value2, "ldmj");
            return (Criteria) this;
        }

        public Criteria andSlxjIsNull() {
            addCriterion("slxj is null");
            return (Criteria) this;
        }

        public Criteria andSlxjIsNotNull() {
            addCriterion("slxj is not null");
            return (Criteria) this;
        }

        public Criteria andSlxjEqualTo(Double value) {
            addCriterion("slxj =", value, "slxj");
            return (Criteria) this;
        }

        public Criteria andSlxjNotEqualTo(Double value) {
            addCriterion("slxj <>", value, "slxj");
            return (Criteria) this;
        }

        public Criteria andSlxjGreaterThan(Double value) {
            addCriterion("slxj >", value, "slxj");
            return (Criteria) this;
        }

        public Criteria andSlxjGreaterThanOrEqualTo(Double value) {
            addCriterion("slxj >=", value, "slxj");
            return (Criteria) this;
        }

        public Criteria andSlxjLessThan(Double value) {
            addCriterion("slxj <", value, "slxj");
            return (Criteria) this;
        }

        public Criteria andSlxjLessThanOrEqualTo(Double value) {
            addCriterion("slxj <=", value, "slxj");
            return (Criteria) this;
        }

        public Criteria andSlxjIn(List<Double> values) {
            addCriterion("slxj in", values, "slxj");
            return (Criteria) this;
        }

        public Criteria andSlxjNotIn(List<Double> values) {
            addCriterion("slxj not in", values, "slxj");
            return (Criteria) this;
        }

        public Criteria andSlxjBetween(Double value1, Double value2) {
            addCriterion("slxj between", value1, value2, "slxj");
            return (Criteria) this;
        }

        public Criteria andSlxjNotBetween(Double value1, Double value2) {
            addCriterion("slxj not between", value1, value2, "slxj");
            return (Criteria) this;
        }

        public Criteria andLmlhlIsNull() {
            addCriterion("lmlhl is null");
            return (Criteria) this;
        }

        public Criteria andLmlhlIsNotNull() {
            addCriterion("lmlhl is not null");
            return (Criteria) this;
        }

        public Criteria andLmlhlEqualTo(Double value) {
            addCriterion("lmlhl =", value, "lmlhl");
            return (Criteria) this;
        }

        public Criteria andLmlhlNotEqualTo(Double value) {
            addCriterion("lmlhl <>", value, "lmlhl");
            return (Criteria) this;
        }

        public Criteria andLmlhlGreaterThan(Double value) {
            addCriterion("lmlhl >", value, "lmlhl");
            return (Criteria) this;
        }

        public Criteria andLmlhlGreaterThanOrEqualTo(Double value) {
            addCriterion("lmlhl >=", value, "lmlhl");
            return (Criteria) this;
        }

        public Criteria andLmlhlLessThan(Double value) {
            addCriterion("lmlhl <", value, "lmlhl");
            return (Criteria) this;
        }

        public Criteria andLmlhlLessThanOrEqualTo(Double value) {
            addCriterion("lmlhl <=", value, "lmlhl");
            return (Criteria) this;
        }

        public Criteria andLmlhlIn(List<Double> values) {
            addCriterion("lmlhl in", values, "lmlhl");
            return (Criteria) this;
        }

        public Criteria andLmlhlNotIn(List<Double> values) {
            addCriterion("lmlhl not in", values, "lmlhl");
            return (Criteria) this;
        }

        public Criteria andLmlhlBetween(Double value1, Double value2) {
            addCriterion("lmlhl between", value1, value2, "lmlhl");
            return (Criteria) this;
        }

        public Criteria andLmlhlNotBetween(Double value1, Double value2) {
            addCriterion("lmlhl not between", value1, value2, "lmlhl");
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