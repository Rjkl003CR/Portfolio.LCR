import {type SchemaTypeDefinition} from 'sanity'
import {projectType} from './projectType'
import {profileType} from './profileType'
import {skillCategoryType} from './skillCategoryType'
import {certificationType} from './certificationType'
import {educationType} from './educationType'
import {leadershipType} from './leadershipType'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    profileType,
    projectType,
    skillCategoryType,
    certificationType,
    educationType,
    leadershipType,
  ],
}

