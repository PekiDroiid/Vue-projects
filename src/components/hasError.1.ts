import { formData } from './Formulario.vue';

export const hasError = (field, otherField) => {
return formData.value[field] === formData.value[otherField];
};
