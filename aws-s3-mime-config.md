# AWS S3 Configuration for GLB Files

If your models are hosted on AWS S3, you need to ensure they are served with the correct MIME type (`model/gltf-binary`). Here's how to configure that:

## Option 1: Set MIME Type When Uploading

When uploading GLB files to S3, specify the correct content-type:

```bash
aws s3 cp your-model.glb s3://your-bucket/models/your-model.glb --content-type "model/gltf-binary"
```

## Option 2: Update Existing Files in S3

For files already in S3, update their metadata:

```bash
aws s3 cp s3://your-bucket/models/airo-quad.glb s3://your-bucket/models/airo-quad.glb --content-type "model/gltf-binary" --metadata-directive REPLACE
aws s3 cp s3://your-bucket/models/airoelevate.glb s3://your-bucket/models/airoelevate.glb --content-type "model/gltf-binary" --metadata-directive REPLACE
```

## Option 3: Configure S3 Bucket CORS

Add a CORS configuration to your S3 bucket:

1. Go to your S3 bucket in the AWS Console
2. Select "Permissions" tab
3. Scroll down to "Cross-origin resource sharing (CORS)"
4. Click "Edit" and paste the following configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

## Option 4: Configure CloudFront Distribution (if using CloudFront)

If you're serving files through CloudFront:

1. Create a new Cache Behavior specifically for GLB files
2. Set the Path Pattern to `*.glb`
3. In the Cache Key and Origin Requests section:
   - Set Origin Request Policy to "AllViewer"
   - Set Response Headers Policy to include CORS headers
4. Create a custom Response Headers Policy that adds:
   - `Content-Type: model/gltf-binary`
   - `Access-Control-Allow-Origin: *`

## Testing Your Configuration

After making these changes, test that your GLB files are served with the correct MIME type:

```bash
curl -I https://fans.ecolinklighting.in/models/airo-quad.glb
```

The response should include:
```
Content-Type: model/gltf-binary
```

This will ensure Three.js can properly load and parse the models instead of treating them as downloads. 