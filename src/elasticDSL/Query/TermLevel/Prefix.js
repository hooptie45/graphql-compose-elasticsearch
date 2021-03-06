/* @flow */

import { InputTypeComposer } from 'graphql-compose';
import { getTypeName, getOrSetType, desc } from '../../../utils';
import { getKeywordAsFieldConfigMap } from '../../Commons/FieldNames';

export function getPrefixITC(opts: mixed = {}): InputTypeComposer {
  const name = getTypeName('QueryPrefix', opts);
  const description = desc(
    `
    Matches documents that have fields containing terms with a specified prefix (not analyzed).
    [Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html)
  `
  );

  const subName = getTypeName('QueryPrefixSettings', opts);
  const fields = getKeywordAsFieldConfigMap(
    opts,
    getOrSetType(subName, () =>
      // $FlowFixMe
      InputTypeComposer.create({
        name: subName,
        fields: {
          value: 'String!',
          boost: 'Float',
        },
      }))
  );

  if (typeof fields === 'object') {
    return getOrSetType(name, () =>
      InputTypeComposer.create({
        name,
        description,
        fields,
      }));
  }

  // $FlowFixMe
  return {
    type: 'JSON',
    description,
  };
}
