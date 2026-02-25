import { config } from '@vue/test-utils';
import { createBootstrap } from 'bootstrap-vue-next';

config.global.plugins = [createBootstrap()];
