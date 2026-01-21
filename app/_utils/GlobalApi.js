const { gql,request } = require("graphql-request")

const MASTER_URL = "https://ap-south-1.cdn.hygraph.com/content/"+process.env.NEXT_PUBLIC_HYGRAPH_API_KEY+"/master"

const getAllCourseList = async()=>{
    const query=gql`
    query MyQuery {
        courseLists(first: 10, orderBy: createdAt_DESC) {
          author
          name
          id
          free
          description
          demoUrl
          banner {
            url
          }
          chapter {
            ... on Chapter {
              id
              name
              video {
                url
              }
            }
          }
          totalChapters
          sourceCode
          tag
        }
      }
    `
    const result=await request (MASTER_URL, query);
    return result;
}

export default{
    getAllCourseList
}