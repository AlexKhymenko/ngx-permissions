import 'reflect-metadata'
import 'zone.js/dist/zone.js'
import 'zone.js/dist/proxy.js'
import 'zone.js/dist/sync-test.js'
import 'zone.js/dist/jasmine-patch.js'
import 'zone.js/dist/async-test.js'
import 'zone.js/dist/fake-async-test.js'
import { TestBed } from '@angular/core/testing'
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing'

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
)