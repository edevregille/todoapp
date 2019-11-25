
## NewRelic Infrastructure and Logs
NRI agent deployed as a DaemonSet

K8s Events 

k8s Logs

## Deploy Mongo DB service

```kubectl create -f k8s-mongo-service.yml```

## Optional - Add New Relic Browser (incl. DT)
Add your Browser agent into the html page (`/public/index.html`) with copy/paste. 
Make sure that the DT feature is enabled for Browser.
Need to build the docker image and push it to your docker hub

```docker build -t DOCKER_IMAGE_NAME .
docker push DOCKER_IMAGE_NAME
```

## Deploy the todoapp service
Replace the NEW_RELIC_LICENSE_KEY in `k8s-todoapp-service.yml` file with your New Relic License Key.
If you have added Browser agent, then modify the image name in the `k8s-todoapp-service.yml` with your own image name.
Then, deploy:

```kubectl create -f k8s-todoapp-service.yml```

You can access the app (create traffic) by going to the public IP

```kubectl get svc```

If you use minikube, you can access the service url with

```minikube service todoapp --url```

## Add the k8s metadata to each transaction
https://docs.newrelic.com/docs/integrations/kubernetes-integration/link-your-applications/link-your-applications-kubernetes

## Add the application logs in context
https://docs.newrelic.com/docs/logs/new-relic-logs/enable-logs-context/enable-logs-context-apm-agents

## Add Prometheus Metrics
https://docs.newrelic.com/docs/integrations/prometheus-integrations/get-started/new-relic-prometheus-openmetrics-integration-kubernetes

## Add Istio Adapter
https://github.com/newrelic/newrelic-istio-adapter
