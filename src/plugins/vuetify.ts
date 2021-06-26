import Vue from 'vue';
import Vuetify, {
    VRow,
    VCol,
    VTextField,
    VTooltip,
    VCheckbox,
    VSelect,
    VRadio,
    VRadioGroup
} from 'vuetify/lib';
import { Ripple, Intersect, Touch, Resize } from 'vuetify/lib/directives';

Vue.use(Vuetify, {
    components: { VRow, VTooltip, VCol, VTextField, VCheckbox, VSelect, VRadio, VRadioGroup},
    directives: { Ripple, Intersect, Touch, Resize },
});

export default new Vuetify({
    icons: {
        iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    }
});