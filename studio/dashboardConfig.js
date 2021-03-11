export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '604a25aa316d5e9c66d0ad16',
                  title: 'Sanity Studio',
                  name: 'acipmar-studio',
                  apiId: '60bb51e5-c0be-4174-ab7b-a0353b299161'
                },
                {
                  buildHookId: '604a25ab3b8f7ec13183049c',
                  title: 'Portfolio Website',
                  name: 'acipmar',
                  apiId: 'a91f430c-55fe-47b2-86cb-94f1a62b504e'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/Turutupa/acipmar',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://acipmar.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
