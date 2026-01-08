
import { useEffect, useState } from 'react'
import './App.css'
import { Course, Exam, Question, QuestionStat, Topic } from './constants'
import { getAllExams, getCourse, getQuesion } from './boilerexams_api'
import Header from './components/header'
import CourseSelector from './components/course_selector'
import OverviewStatScreen from './components/overview_stat_screen'
import CourseStatScreen from './components/course_stat_screen'

function App() {
  const DefaultLocalSubmissions: {
    [key: string]: {
      attempts: {
        id: string;
        correct: boolean;
        userSolution: number[];
        type: string;
        ghost?: boolean;
      }[];
    };
  } = {
    "1f86e0a7-0736-4f45-85d7-b0e4cdf5f969": {
      "attempts": [
        {
          "id": "b75b7f23-1a27-40f1-aaaf-3ac2fb5df052",
          "correct": false,
          "userSolution": [
            2
          ],
          "type": "MULTIPLE_CHOICE"
        },
        {
          "id": "87733164-7758-49cd-aff3-ba81d78b2189",
          "correct": false,
          "userSolution": [
            1
          ],
          "type": "MULTIPLE_CHOICE"
        },
        {
          "id": "1ac69fa1-ab04-4c71-a893-df44f06fe5c1",
          "correct": true,
          "userSolution": [
            4
          ],
          "type": "MULTIPLE_CHOICE"
        }
      ]
    },
    "34b774c2-fd83-480d-acdb-3b170477cdb8": {
      "attempts": [
        {
          "id": "6dc31110-d753-4044-ad2b-5ec14379e43d",
          "correct": false,
          "userSolution": [
            3
          ],
          "type": "MULTIPLE_CHOICE"
        },
        {
          "id": "7057d4ad-2654-4637-b08c-c7bab6c5afce",
          "correct": false,
          "userSolution": [
            2
          ],
          "type": "MULTIPLE_CHOICE"
        },
        {
          "id": "2b5d6099-8bb8-4d51-aaba-df6948fcedc1",
          "correct": true,
          "userSolution": [
            1
          ],
          "type": "MULTIPLE_CHOICE"
        }
      ]
    },
    "92b0b416-a28e-4d94-a6d0-00e30c836209": {
      "attempts": [
        {
          "id": "6c07efa6-c1ac-490d-bac1-5e7cd41e150c",
          "correct": false,
          "userSolution": [
            4
          ],
          "type": "MULTIPLE_CHOICE"
        },
        {
          "id": "3f57ef1a-a88d-44d3-a001-41d80b9d9c42",
          "correct": false,
          "userSolution": [
            4
          ],
          "type": "MULTIPLE_CHOICE"
        },
        {
          "id": "ded59800-12bf-4b32-93e3-4e3669198e0f",
          "correct": true,
          "userSolution": [
            1
          ],
          "type": "MULTIPLE_CHOICE"
        }
      ]
    },
    "ad02cfa5-e269-4f18-953c-eabaf4aba395": {
      "attempts": [
        {
          "id": "1a68d8ce-5267-4c2d-9c08-3b001c1cd4b8",
          "correct": false,
          "userSolution": [
            1
          ],
          "type": "MULTIPLE_CHOICE"
        }
      ]
    },
    "ae399a1f-0722-4de6-a0c9-164a5d3e4a09": {
      "attempts": [
        {
          "id": "86afd507-8b08-4be6-8eee-e0f211197510",
          "correct": false,
          "userSolution": [
            1
          ],
          "type": "MULTIPLE_CHOICE"
        },
        {
          "id": "392ff2cf-5de7-438c-b8c4-9010e96d3da4",
          "correct": false,
          "userSolution": [
            4
          ],
          "type": "MULTIPLE_CHOICE"
        },
        {
          "id": "c1759689-5b79-43fb-bb61-5f7d41fc8ba6",
          "correct": true,
          "userSolution": [
            3
          ],
          "type": "MULTIPLE_CHOICE"
        }
      ]
    },
    "b82e5940-1afd-4514-8fe1-c3bd89adbb27": {
      "attempts": [
        {
          "id": "3527499c-2c01-4fc5-be9e-588375ed5a08",
          "correct": false,
          "userSolution": [
            0
          ],
          "type": "MULTIPLE_CHOICE"
        }
      ]
    },
    "c5fe1087-3fad-40e3-8b02-baa066f7718d": {
      "attempts": [
        {
          "id": "829a32c1-821d-4558-ba1e-d889cadad2a1",
          "correct": false,
          "userSolution": [
            1
          ],
          "type": "MULTIPLE_CHOICE"
        },
        {
          "id": "399b2822-83c5-4565-9cfb-bde6b4a87d74",
          "correct": true,
          "userSolution": [
            3
          ],
          "type": "MULTIPLE_CHOICE"
        }
      ]
    },
    "ce88915a-d4cd-46cb-a1e6-c63f016ce5c7": {
      "attempts": [
        {
          "id": "1a2165c2-fe40-48dc-b06b-fceedee00319",
          "correct": false,
          "userSolution": [
            4
          ],
          "type": "MULTIPLE_CHOICE"
        }
      ]
    },
    "d028ae9b-37c1-4d74-a191-574e365dfa42": {
      "attempts": [
        {
          "id": "b04df926-749b-450d-a41d-92ba4056145d",
          "correct": false,
          "userSolution": [
            4
          ],
          "type": "MULTIPLE_CHOICE"
        }
      ]
    },
    "d44531f1-3cf7-404d-bd10-e9a786484b8a": {
      "attempts": [
        {
          "id": "adc9bd82-a158-4748-878a-2eb1eb4e955e",
          "correct": false,
          "userSolution": [
            0
          ],
          "type": "MULTIPLE_CHOICE"
        },
        {
          "id": "32fe2248-de2b-42c0-aacd-b988eb5fd2fd",
          "correct": false,
          "userSolution": [
            2
          ],
          "type": "MULTIPLE_CHOICE"
        },
        {
          "id": "9202d742-94e0-406d-a1f0-1078c1e0983a",
          "correct": true,
          "userSolution": [
            4
          ],
          "type": "MULTIPLE_CHOICE"
        }
      ]
    },
    "fce43ea6-284e-4347-ab51-b0b32184c310": {
      "attempts": [
        {
          "id": "c50d3110-aed2-44ba-aa03-cce1ec03a578",
          "correct": false,
          "userSolution": [
            1
          ],
          "type": "MULTIPLE_CHOICE"
        }
      ]
    },

    "0de0aadf-ec5a-417c-8d61-0fb3716d0004": { "attempts": [{ "id": "daef4435-f2a2-4e4a-b165-d9ccf2c0b1e3", "correct": true, "userSolution": [3], "type": "MULTIPLE_CHOICE" }] },
    "0c5de99d-5440-45ab-83e2-6ef2b557ddfe": { "attempts": [{ "id": "7b12f681-a895-48dd-9f98-ed172a7a65fe", "correct": true, "userSolution": [3], "type": "MULTIPLE_CHOICE" }] }, "0faa9739-4dbe-404f-811d-622dc3d7b8b5": { "attempts": [{ "id": "6f077ae2-afb1-40a3-837d-4476df75dc5b", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "0f4be062-452d-4257-8e56-993f93b00349": { "attempts": [{ "id": "046c27fa-8fe0-4938-bf61-90883b3ee30b", "correct": true, "userSolution": [4], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "3cff8f43-9a44-4866-9496-fa4284c720bd", "correct": true, "userSolution": [4], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "0a66a2a0-5f0d-4c2f-a9d6-2e19539912a9": {
      "attempts": [{ "id": "8dbc3cda-a4fa-4326-9a6a-c223c99a8390", "correct": false, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "19040368-2ad2-4782-bd0b-905ef9aa89d2", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "9e666208-66a4-4a44-8df8-f34c7291074c", "correct": true, "userSolution": [4], "type": "MULTIPLE_CHOICE", "ghost": false }]
    },

    "0dff04ce-f743-40a9-8d6d-91347fefda60": { "attempts": [{ "id": "74221ce1-f1cd-4638-adcd-8f50b91b8e4f", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "7cf56667-03de-48f3-974f-4795e2520c4d", "correct": false, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "3faddac6-7a98-4142-b790-2efa391c017f", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "7c8aea73-5433-4e3a-85a4-950b09dd1d52", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "0b956718-4cf8-41e4-9002-2e1ff4f62b5d": { "attempts": [{ "id": "22f1b4ac-d282-4cfe-80f2-de4e826a92e9", "correct": true, "userSolution": [4], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "0e13589c-4d59-4eb7-9dbd-fca1b8b4b36a": { "attempts": [{ "id": "49a20d90-6140-42f1-b3d5-1466fcb7292f", "correct": false, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "2c73eca9-3fe2-4934-8f0a-ffddc6503ae9", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "0c25ded2-aa96-4cce-8c1f-4b2306ea2b6a": { "attempts": [{ "id": "b7135a76-4a3d-4f5e-8056-d6410e5fd604", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "ec09c9b6-acb2-4b76-8892-7c752671969b", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "1cb6143c-3dff-49cd-a8f4-fb40b271422e": { "attempts": [{ "id": "d358a7b3-2e99-4cfc-8b72-d82df54cd4ad", "correct": false, "userSolution": [4], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "a9b65081-9523-48f6-a30d-b27437a5beb9", "correct": true, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "1eace59f-6566-4336-a16e-b46ff3cda00e": { "attempts": [{ "id": "95aa27b1-98cd-4ffe-a38a-2686eba4bf63", "correct": true, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "1c53274a-62f8-4afd-8ded-dbdec66ad00c": { "attempts": [{ "id": "d22b3fb1-6c2d-49ee-91cc-9d789f41fb00", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "14a2c61b-c35a-4586-b262-5f583da7b971", "correct": true, "userSolution": [3], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "1e234830-ae75-4aa2-9e41-8ad7a34d2d30": { "attempts": [{ "id": "018f7348-53b7-43b5-afc8-4b276c709f95", "correct": true, "userSolution": [4], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "1a9ab036-35d3-4fa9-b022-5f312213ff8f": { "attempts": [{ "id": "a8633637-db31-4050-a0b1-34e96e5692e5", "correct": true, "userSolution": [3], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "1ba7e432-4b66-4239-a444-6376611cdb38": { "attempts": [{ "id": "c598488a-ea15-404f-b68c-0cbed0f896a5", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "427d2c07-7c5d-40d9-8383-ed75e8c59d69", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "1d1f59a2-b378-413e-b20c-e9d48db7a166": { "attempts": [{ "id": "ee085ed4-1d2c-43f9-8c89-b3f9fb0a4b60", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "1d05f21d-e509-49b3-858b-9f2cb6b4487f": { "attempts": [{ "id": "d4b9b353-8e1d-4ff9-8ccf-49e451528cbf", "correct": true, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "02a19a55-9b03-45a8-8928-61f304b7c7fb": { "attempts": [{ "id": "c51160cf-0fc5-436b-bf64-0021586db0ab", "correct": true, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "2d96c156-ce84-4b8a-a3cc-4697ff039707": { "attempts": [{ "id": "ad9a8169-d654-4f71-9a94-c2f44a41a6b9", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "2fd3b8ac-5583-40ce-8a26-d42a7d648982": { "attempts": [{ "id": "6c2ef4c6-94a7-4453-9f7b-35d79d7077cf", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "1ddf45e8-4c9f-4cd9-8b72-b07b76528e04", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "f23d2773-fc99-4188-ae94-6b65c747d494", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "2c96dd30-f0be-43eb-bdba-de40d89fb2f5": { "attempts": [{ "id": "425267dd-d3b7-45af-854d-a50e4e92518d", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "b5ca10d3-52ab-443e-9f71-40bbd3709835", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "20dadf25-fcaa-4cfc-8c3d-c75a5183b214", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "2b59b7da-ce72-4863-81df-3b7366f95a45": { "attempts": [{ "id": "961ebbf8-1ec4-4fe1-ac87-0127a4f2a2a7", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "9dbff5c2-3415-4d97-84be-c686ea52dcf7", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "2babcb23-91c7-4328-be7e-21d928212a72": { "attempts": [{ "id": "6e96fe8c-c4d3-4a30-96d9-314c9cb1e724", "correct": false, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "37be2328-11bc-4b0e-a113-5eb33a5ff2cd", "correct": true, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "65a38da2-503c-4576-bc36-5b9df19c9c2e", "correct": true, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "2f024642-7a86-4d5a-8518-1b38fd7bea53": { "attempts": [{ "id": "8e5a8d49-13a7-4fca-9d6b-aa6cf5efe0c7", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "3ca60026-d33f-44b5-b78c-936412a46e78", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "3ccc7b10-9cf7-4ded-a24a-4fefe6489215": { "attempts": [{ "id": "e9bd6895-2564-444e-9d66-cf442501efaf", "correct": false, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "9d10e0fd-df07-4383-9abe-bab68fa60bfe", "correct": true, "userSolution": [4], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "3fea598b-8e01-4811-b21a-9010b447f172": { "attempts": [{ "id": "6f382f43-6345-49ac-b8fa-3f865c987943", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "90a5a15b-7d6e-4cbb-bb99-f13a81e5733c", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "3ec737ce-758b-4d8e-b833-8ee7468ff5bc": { "attempts": [{ "id": "1302ec99-e275-4544-83f0-d383657d7c85", "correct": false, "userSolution": [3], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "c64bdcf5-89a3-4dc9-93e5-c878f45f4279", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "3c806927-4d8a-43f6-ae92-726113ec66e3": { "attempts": [{ "id": "003d340d-25b3-42ca-9565-8db2d1a89bc7", "correct": false, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "aad30e4a-56a8-4066-885e-4f487581ecdb", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "f7eb6faa-5390-4dcb-8d78-b689ff11ea3c", "correct": false, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "3dfd51e9-8969-4862-bba5-a56cf16bf05a": { "attempts": [{ "id": "5d53fcc9-203f-4a0c-94aa-8e9cc6af5179", "correct": true, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "3c26c4b8-8531-49da-ab17-9eb4e0dda1d4": { "attempts": [{ "id": "f718c979-d33b-4740-939c-4c92312fd080", "correct": true, "userSolution": [4], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "3ab78947-bf57-453b-8483-81f9c540cc71": { "attempts": [{ "id": "1a1b7dbf-df51-4842-a8eb-624318de3513", "correct": true, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "3b758db5-60f0-43c6-b1df-245b741b92d3": { "attempts": [{ "id": "63fef991-5545-467f-9e9b-20cd36058a8c", "correct": false, "userSolution": [4], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "b4d9145c-4f18-48ad-84b1-ffda5f55543f", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "11e20ba2-c844-438e-b305-df4884a70ce2", "correct": true, "userSolution": [3], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "4fe3563c-4464-4f59-8947-3f81c8fb58aa": { "attempts": [{ "id": "3605bec4-a329-4bcc-840a-6c14c814728a", "correct": true, "userSolution": [3], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "d809fa09-f434-422c-9c84-1ee62238f345", "correct": true, "userSolution": [3], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "644102d3-4a4f-4c6a-94d9-4d73a2ecf738", "correct": false, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "38adb78b-724e-4102-b153-0d7e68011f5f", "correct": true, "userSolution": [3], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "4f296e5f-2a71-4a88-9fc1-7772a8f77585": { "attempts": [{ "id": "c31d9ce6-f169-4ea4-9256-2ba1aaf3eed7", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "0fc381f6-6c91-4e85-860d-644e3fe35dc7", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "f1eb9d66-6b95-4b56-b16f-e98c3c7e86fe", "correct": true, "userSolution": [4], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "4ab84f99-9cf5-4e74-a1f3-cbae444de6a1": { "attempts": [{ "id": "1d1c4651-07a1-4f21-b0e5-78c5015932e8", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "4c982ad1-7ee9-48d0-acfd-cb3de3548148": { "attempts": [{ "id": "76e54528-2b81-4cd6-b075-1ec4a02afe09", "correct": true, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "33c3288b-3de4-4adc-ac84-6488a912482e", "correct": true, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "22bae954-9524-4abf-b5bc-b2634fc923cd", "correct": true, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "4e0f66fc-e766-4e03-9d49-f6013fa8433a": { "attempts": [{ "id": "45101ec3-b07d-4011-8ad3-c467cff1f8a1", "correct": false, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "4ffedf49-1350-448f-a9c0-0f69d7528544": { "attempts": [{ "id": "2558f003-b1a5-4d98-be67-ef0ab8c10981", "correct": true, "userSolution": [3], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "4c2ac7e1-57b8-447d-814c-65746124d7b6": { "attempts": [{ "id": "84e8f0a3-3d7b-4df6-84a4-b8b601d83ed0", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "f029666e-c057-4c8f-a2a6-4f7896b6e975", "correct": false, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "4ff058a8-dadd-4a48-b8f9-fc68f2074a7f": { "attempts": [{ "id": "bdf2f70a-28cc-4b66-b9b0-9c592f7d55d9", "correct": true, "userSolution": [3], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "4a6173d3-4aa9-4a91-bcf6-dc6c1dff30df": { "attempts": [{ "id": "00299fb0-664d-4a2f-9b62-10b3bac2889e", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "4bcf6ed9-951c-442e-8103-ec4e3a419aa2": { "attempts": [{ "id": "996ae595-6db3-4643-bc47-cfad6fe57b44", "correct": true, "userSolution": [4], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "5d5fa6e6-6621-4e5d-aa6f-58160ee0db20": { "attempts": [{ "id": "865f297a-e628-4d03-b108-07224cce0959", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "7b1787a5-9f3c-4d74-a034-4ff22864e2dc", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "0435f64e-2e59-4d4d-ba16-98b920ce4957", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "5d358cb6-0531-4eb3-bb3d-6e4a7b4937f3": { "attempts": [{ "id": "4df7f049-7657-42c2-80f7-7b35f8378896", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "5d67cc5f-5295-4c9c-9c77-0af5f4cc4f81": { "attempts": [{ "id": "92eeae76-0cc6-4813-8a83-61b113388e68", "correct": true, "userSolution": [4], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "5f1046c9-5a98-415f-9447-46ab964e268f": { "attempts": [{ "id": "fa70e0d7-b3b8-40bf-b513-5773b2a88c77", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "12230b8e-9ac1-4751-b177-0d8113ebf700", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "caa61337-a945-4ea7-987a-19213693d1ce", "correct": true, "userSolution": [4], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "4216424a-7e3b-40f5-86fc-287470b9cb50", "correct": true, "userSolution": [4], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "5a283737-9255-414a-be07-d01f65eafdc7": { "attempts": [{ "id": "fd101826-22fb-40a3-9676-c7aa0f199b76", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "5afc9e1c-57f1-452d-8c49-0e61afd4ef72": { "attempts": [{ "id": "aaaddc81-52bc-4e23-bc5e-7fb210b185b0", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "ff6994ec-7c56-4c20-8ed7-c64e954f6b1c", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "5fd4f6b3-617a-4729-9b9a-98c3e21eb797": { "attempts": [{ "id": "acc26b70-0646-47c3-8e78-7fad34dacf70", "correct": true, "userSolution": [3], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "4d1e3998-27dc-47b5-b4ed-0223f451fe9c", "correct": true, "userSolution": [3], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "5d38dabf-78f0-49b3-90b1-9a75cefb08a3": { "attempts": [{ "id": "3b4f2c25-2db4-4a41-b684-d4fc5a6336d3", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "be863d7a-909c-4bd4-9a28-e7958c8f91d9", "correct": false, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "810c26de-d9c2-45ac-9056-0de798382914", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "6c0cb389-31db-401d-acd2-cd1a379ef96d": { "attempts": [{ "id": "cd8bef38-03ab-4694-a918-4cba1ed9a3ea", "correct": false, "userSolution": [3], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "effa91a4-a9dc-4308-9780-99ea7f2412cf", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "87dbdb76-7883-40a0-ba36-410d347b0768", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "6e6e4dfc-b1df-4afb-aeed-b3bcb5520b00": { "attempts": [{ "id": "c6efa51a-edc2-4518-bccd-f3cdff12e527", "correct": false, "userSolution": [3], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "f417f886-5000-4310-8faa-0531ddc84b38", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "cc4461f7-909d-48fd-b256-0f0b7eb2df58", "correct": true, "userSolution": [0], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "6f89cd82-1579-4304-8ddd-da84d4785ff8": { "attempts": [{ "id": "a8bc1921-fedf-4dd6-8f43-e2bb5be3c628", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "ef1749bb-7618-417e-a137-71c93f3a2623", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "561dcdf6-1fc8-42a5-9af4-5dee4b370773", "correct": false, "userSolution": [], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "17bf7450-8804-4df7-b0d4-73de11fa0486", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }] },

    "6d16d296-d4d3-403c-b7de-90d538469483": { "attempts": [{ "id": "2ffffbcf-ed6a-4907-8685-0e4b71c03494", "correct": false, "userSolution": [2], "type": "MULTIPLE_CHOICE", "ghost": false }, { "id": "a9809c23-a40e-4c82-be66-6a5314b7a3df", "correct": true, "userSolution": [1], "type": "MULTIPLE_CHOICE", "ghost": false }] },

  }

  const getLocalSubmissions = (): QuestionStat[] => {
    const questionStats: QuestionStat[] = [];
    Object.keys(localStorage).forEach((submissionId) => {
      try {
        questionStats.push(QuestionStat.fromJSON(JSON.parse(localStorage.getItem(submissionId)!), submissionId))
      } catch (e) {
        console.log(e)
        console.log("Found not a stat in local storage: ", submissionId)
      }
    });
    return questionStats;
  };

  const [localSubmissions, setLocalSubmissions] = useState<QuestionStat[]>(getLocalSubmissions());
  const [courses, setCourses] = useState<Course[]>([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState<Question[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    const loadData = async () => {
      const loadedQuestions: Question[] = [];
      const loadedCourses: Course[] = [];
      const loadedExams: Exam[] = await getAllExams();
      const loadedTopics: Topic[] = [];
      for (const stat of localSubmissions) {

        const question: Question = await getQuesion(stat.id);
        loadedQuestions.push(question);
        for (const topic of question.topics) {
          if (!loadedTopics.find((t) => t.id == topic.id)) loadedTopics.push(topic)
        }
        if (!loadedCourses.find((c) => c.id === question.courseId)) {
          const course: Course = await getCourse(question.courseId);
          loadedCourses.push(course)
        }
      }
      const promises = [];
      for (const exam of loadedExams.filter((e) => loadedCourses.find((c) => c.id == e.courseId))) {
        for (const q of exam.questions) {
          if (!loadedQuestions.find((lQ) => lQ.id == q)) {
            promises.push(getQuesion(q));

          }
        }
      }
      const questions = await Promise.all(promises);
      for (const q of questions) {
        for (const topic of q.topics) {
          if (!loadedTopics.find((t) => t.id == topic.id)) loadedTopics.push(topic)
        }
      }

      setTopics(loadedTopics)
      setAttemptedQuestions(loadedQuestions)
      setCourses(loadedCourses)
      setExams(loadedExams)
      console.log(loadedQuestions, "LOADED QUESTIONS")
      console.log(loadedCourses)
      console.log(loadedExams)
      console.log(loadedTopics)
      setLocalSubmissions(localSubmissions)
      console.log(attemptedQuestions)
      console.log(courses)
      console.log(exams)
      console.log(topics)
      setLoading(false)
    }
    loadData()
  }, [])

  const filterQuestionStatsByCourse = (course: Course, questionStats: QuestionStat[], allQuestions: Question[]): QuestionStat[] => {
    const answeredCourseQuestions: Question[] = allQuestions.filter((q) => q.courseId == course.id);
    const filteredQuestions: QuestionStat[] = questionStats.filter((q) => answeredCourseQuestions.find((cQ) => cQ.id == q.id));
    console.log(filteredQuestions, "FILTERED QUESTIONS")
    return filteredQuestions
  }

  const filterExamsByCourse = (course: Course, exams: Exam[]): Exam[] => {
    console.log(course.id, "COURSE ID")
    const filteredExams: Exam[] = exams.filter((e) => e.courseId == course.id)
    console.log(filteredExams);
    return filteredExams;
  }



  return (
    <>
      <Header />
      <br />
      {loading ? <> <div className='loader'></div></> : <>
        {localSubmissions.length > 0 ? <>
          <CourseSelector courses={courses} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
          <br />
          {selectedCourse == null ? <OverviewStatScreen courses={courses} exams={exams} questionStats={localSubmissions} questions={attemptedQuestions} setSelectedCourse={setSelectedCourse} /> : <></>}
          {courses.map((course) => selectedCourse != null && course.id == selectedCourse.id ? <CourseStatScreen course={course} exams={filterExamsByCourse(course, exams)} questionStats={filterQuestionStatsByCourse(course, localSubmissions, attemptedQuestions)} questions={attemptedQuestions} topics={topics.filter((t) => t.courseId == course.id)} /> : <></>)} </>
          :
          <>
            <h1 className='no-questions'>You haven't answered any questions! <br></br> You better get studying!</h1>
          </>}
        <button className='set-local' onClick={() => {
          Object.keys(DefaultLocalSubmissions).forEach((submissionId) => {
            localStorage.setItem(submissionId, JSON.stringify(DefaultLocalSubmissions[submissionId]));
          });
          window.location.reload()
        }}>
          Set Defaul Local Submissions
        </button>
      </>}



    </>
  )
}

export default App
