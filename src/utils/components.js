import uploadComponent from '../components/upload.vue';



const upload = {
    install:function(Vue) {
        Vue.component('upload', uploadComponent)
    }
}

export default upload;
