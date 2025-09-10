import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Server, 
  AlertTriangle, 
  Settings, 
  Database, 
  FileText,
  Upload,
  Download,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

interface ITGCControl {
  id: string;
  name: string;
  category: string;
  riskLevel: "High" | "Medium" | "Low";
  status: "Tested" | "In Progress" | "Not Started";
  lastTested: string;
  findings: number;
  description: string;
}

const sampleControls: ITGCControl[] = [
  {
    id: "AC001",
    name: "User Access Management",
    category: "Access Controls",
    riskLevel: "High",
    status: "Tested",
    lastTested: "2024-01-15",
    findings: 2,
    description: "Controls over user provisioning, modification, and termination"
  },
  {
    id: "AC002", 
    name: "Privileged Access Controls",
    category: "Access Controls",
    riskLevel: "High",
    status: "In Progress",
    lastTested: "2024-01-10",
    findings: 0,
    description: "Controls over administrative and privileged user access"
  },
  {
    id: "DR001",
    name: "Disaster Recovery Plan",
    category: "Disaster Recovery",
    riskLevel: "High",
    status: "Not Started",
    lastTested: "2023-12-20",
    findings: 1,
    description: "Business continuity and disaster recovery procedures"
  },
  {
    id: "IM001",
    name: "Incident Response Procedures",
    category: "Incident Management",
    riskLevel: "Medium",
    status: "Tested",
    lastTested: "2024-01-12",
    findings: 0,
    description: "Procedures for handling security incidents and breaches"
  },
  {
    id: "CM001",
    name: "Change Management Process",
    category: "Change Management",
    riskLevel: "Medium",
    status: "In Progress",
    lastTested: "2024-01-08",
    findings: 1,
    description: "Controls over system and application changes"
  },
  {
    id: "BU001",
    name: "Data Backup Procedures",
    category: "Backup",
    riskLevel: "High",
    status: "Tested",
    lastTested: "2024-01-14",
    findings: 0,
    description: "Regular backup and restoration procedures"
  },
  {
    id: "AT001",
    name: "Audit Trail Configuration",
    category: "Audit Trail",
    riskLevel: "Medium",
    status: "Not Started",
    lastTested: "2023-12-18",
    findings: 2,
    description: "Logging and monitoring of system activities"
  }
];

const ITGCDashboard = () => {
  const [selectedBank, setSelectedBank] = useState("SBI");
  const [controls] = useState<ITGCControl[]>(sampleControls);

  const banks = ["SBI", "HDFC Bank", "ICICI Bank", "Kotak Mahindra", "Axis Bank", "Punjab National Bank"];

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Tested": return <CheckCircle className="h-4 w-4 text-success" />;
      case "In Progress": return <Clock className="h-4 w-4 text-warning" />;
      case "Not Started": return <XCircle className="h-4 w-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Access Controls": return <Shield className="h-5 w-5" />;
      case "Disaster Recovery": return <Server className="h-5 w-5" />;
      case "Incident Management": return <AlertTriangle className="h-5 w-5" />;
      case "Change Management": return <Settings className="h-5 w-5" />;
      case "Backup": return <Database className="h-5 w-5" />;
      case "Audit Trail": return <FileText className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  const testedCount = controls.filter(c => c.status === "Tested").length;
  const progressPercentage = (testedCount / controls.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground">
                ITGC Testing Platform
              </h1>
              <p className="text-primary-foreground/80 mt-2">
                Comprehensive IT General Controls Testing for Indian Banks
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
              <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Bank Selection */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle>Select Bank</CardTitle>
            <CardDescription>Choose the bank for ITGC assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {banks.map((bank) => (
                <Button
                  key={bank}
                  variant={selectedBank === bank ? "default" : "outline"}
                  onClick={() => setSelectedBank(bank)}
                  className="hover:shadow-hover transition-all duration-200"
                >
                  {bank}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Controls</p>
                  <p className="text-2xl font-bold">{controls.length}</p>
                </div>
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tested</p>
                  <p className="text-2xl font-bold text-success">{testedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Findings</p>
                  <p className="text-2xl font-bold text-warning">
                    {controls.reduce((sum, c) => sum + c.findings, 0)}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Progress</p>
                  <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
                </div>
                <div className="w-8 h-8 relative">
                  <Progress value={progressPercentage} className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="controls" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="controls">ITGC Controls</TabsTrigger>
            <TabsTrigger value="assessment">Risk Assessment</TabsTrigger>
            <TabsTrigger value="testing">Test Programs</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="controls" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>ITGC Controls Matrix - {selectedBank}</CardTitle>
                <CardDescription>
                  Comprehensive list of IT General Controls based on Big Four methodologies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {controls.map((control) => (
                    <div
                      key={control.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        {getCategoryIcon(control.category)}
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{control.name}</h3>
                            <Badge className="text-xs" variant={getRiskBadgeVariant(control.riskLevel)}>
                              {control.riskLevel} Risk
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{control.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>ID: {control.id}</span>
                            <span>Category: {control.category}</span>
                            <span>Last Tested: {control.lastTested}</span>
                            {control.findings > 0 && (
                              <span className="text-warning">{control.findings} Finding(s)</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(control.status)}
                        <span className="text-sm">{control.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessment">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Risk Assessment Matrix</CardTitle>
                <CardDescription>
                  Evaluate and prioritize ITGC risks for {selectedBank}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
                  <p>Risk assessment functionality coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Test Programs</CardTitle>
                <CardDescription>
                  Generate and manage test programs for ITGC controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4" />
                  <p>Test program generation coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Findings & Recommendations</CardTitle>
                <CardDescription>
                  Generate comprehensive audit reports and workpapers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Download className="h-12 w-12 mx-auto mb-4" />
                  <p>Report generation coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ITGCDashboard;