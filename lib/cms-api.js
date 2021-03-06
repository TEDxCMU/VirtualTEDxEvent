/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as prismicApi from './cms-provider/index';

let cmsApi = null;

if (process.env.PRISMIC_REPO_ID && process.env.PRISMIC_ACCESS_TOKEN) {
  cmsApi = prismicApi;
}

export async function getSchedule() {
  return cmsApi.getSchedule();
}

export async function getSpeakers() {
  return cmsApi.getSpeakers();
}

export async function getInnovators() {
  return cmsApi.getInnovators();
}

export async function getStage() {
  return cmsApi.getStages();
}
