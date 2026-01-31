import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { API } from "@/utils/Api";

function Addnewinterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUserEmail = () => {
    return localStorage.getItem('userEmail') || "example@gmail.com";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const geminiRes = await API({
        method: 'POST',
        url: '/gemini/generate',
        data: { jobPosition, jobDesc, jobExperience },
      });

      const geminiData = geminiRes.data;
      if (!geminiData.success) {
        throw new Error(geminiData.error || 'Failed to generate questions');
      }

      const MockjsonResp = geminiData.data;
      if (MockjsonResp) {
        const createRes = await API({
          method: 'POST',
          url: '/interview',
          data: {
            jsonMockResp: MockjsonResp,
            jobPosition,
            jobDesc,
            jobExperience,
            createdBy: getUserEmail(),
            createdAt: moment().format("DD-MM-YYYY"),
            mockId: uuidv4(),
          },
        });

        const data = createRes.data;
        if (data.success) {
          toast.success("Interview created successfully!");
          setOpenDialog(false);
          navigate(`/dashboard/interviews/${data.data._id}`);
        } else {
          toast.error(data.error || "Failed to create interview");
        }
      } else {
        toast.error("Failed to generate questions. Please try again.");
      }
    } catch (error) {
      console.error("Error in AI generation:", error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || "An error occurred. Please check your connection and try again.";
      toast.error(errorMessage);
      if (errorMessage.includes("API key") || errorMessage.includes("GEMINI_API_KEY")) {
        toast.error("Please configure your Gemini API key in the backend .env file", {
          duration: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <div
          className="p-12 border-2 border-dashed border-gray-300 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 hover:scale-105 hover:shadow-lg cursor-pointer transition-all group"
          onClick={() => setOpenDialog(true)}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-3xl font-bold text-white"> <PlusIcon/> </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-700 group-hover:text-gray-900">Add New Interview</h2>
            <p className=" text-sm text-gray-500 text-center">Create a new mock interview session</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-slate-200">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Interview
          </DialogTitle>
          <DialogDescription className="text-base">
            Provide job details to generate personalized AI interview questions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="mt-4">
          <div className="space-y-4">
            <div>
              <label className="font-medium">Job Position</label>
              <Input
                placeholder="Ex. Frontend Developer"
                required
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Job Description</label>
              <Textarea
                placeholder="Ex. React, Next.js, TypeScript, etc."
                required
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Years of Experience</label>
              <Input
                type="number"
                required
                placeholder="Ex. 5"
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
                min="0"
              />
            </div>
            <div className="flex gap-4 justify-end pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={(e) => { e.preventDefault(); setOpenDialog(false); }}
                className="min-w-[100px]"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="min-w-[180px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <span>Generate Questions</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Addnewinterview;
