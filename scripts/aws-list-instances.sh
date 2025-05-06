aws ec2 describe-instances \
  --region ap-southeast-1 \
  --query "Reservations[*].Instances[*].[InstanceId, Tags[?Key=='Name']|[0].Value, State.Name, PublicIpAddress]" \
  --output table
