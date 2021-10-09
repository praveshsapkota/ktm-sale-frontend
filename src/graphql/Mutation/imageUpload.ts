import { gql } from "@apollo/client"

export const UploadImage = gql`
    mutation ($files:[Upload!]!) {
    S3ImageUpload(file:$files)
}
`