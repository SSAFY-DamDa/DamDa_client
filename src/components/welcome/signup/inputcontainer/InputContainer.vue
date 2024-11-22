<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="label-input_interval">
    <label>{{ title }}</label>
    <div :class="['input-container', { 'err-input': error }]">
      <input
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur')"
        :required="required"
      />
    </div>
    <div v-if="error" class="err-msg">{{ error }}</div>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 490px;
  width: 70%;
  height: 60px;
  border: 1px solid #7bbcb0;
  border-radius: 5px;
}

.label-input_interval {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  label {
    max-width: 470px;
    width: 70%;
    margin: 0 5px 0 0;
    color: #a9a9a9;
    font-size: 1.6rem;
  }

  input {
    width: 90%;
    height: 100%;
    outline: none;
    border: 0px;
    font-size: 1.6rem;
  }

  .input-container:focus-within {
    height: 58px;
    border: 2px solid #5e9288;
  }

  .err-input {
    border: 1px solid #ff4545;
  }
  .err-input:focus-within {
    border-color: #f53b3b;
  }
}

.err-msg {
  max-width: 470px;
  width: 70%;
  color: #ff4545;
}
</style>
